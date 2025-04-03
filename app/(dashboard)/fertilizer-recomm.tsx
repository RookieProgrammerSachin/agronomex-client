import Button from "@/components/Button";
import Header from "@/components/Header";
import { DashboardLayout } from "@/components/layout";
import { API_URL } from "@/constants/url";
import { useNutrientResultContext } from "@/context/NutrientResultContext";
import useAuth from "@/hooks/useAuth";
import { db } from "@/utils/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FertilizerCardType = {
  // formula: string;
  fertilizerName: string;
  description: string;
  // content: string;
  // unit: string;
};

function FertilizerCard({
  // formula,
  fertilizerName,
  description,
  // content,
  // unit,
}: FertilizerCardType) {
  return (
    <View className="w-[92vw] flex-row rounded-lg border border-blue-400/50 p-1">
      {/* Nutrient Logo Box */}
      {/* <View className="w-18 aspect-square rounded-md bg-blue-400 items-center justify-center p-2">
        <Text className="text-3xl text-white">{formula}</Text>
      </View> */}
      <View className="w-full ml-5">
        <Text className="text-blue-400 font-semibold text-lg">
          {fertilizerName}
        </Text>
        <Text className="text-blue-400">{description}</Text>
        {/* <Text className="text-blue-400 font-bold text-lg">
          {content} {unit}
        </Text> */}
      </View>
    </View>
  );
}

export default function FertilizerRecommendation() {
  const nutrientResults = useNutrientResultContext();
  const { user } = useAuth();

  const [data, setData] = useState<{
    nutrient_levels: { [key: string]: string };
    nutrient_suggestions: { nutrient: string; suggestion: string }[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | { error: string }>(null);
  const [fertilizerName, setFertilizerName] = useState<string>();

  async function getFertilizerSuggestions() {
    if (fertilizerName?.toLocaleLowerCase().trim() !== "paddy")
      return Alert.alert("This crop is not supported!");
    try {
      setIsLoading(true);
      setError(null);
      const fertilizerSuggestionsRequest = await fetch(
        API_URL + "/fertilizers",
        {
          method: "POST",
          body: JSON.stringify({ type: "", values: nutrientResults?.results }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const fertilizerSuggestionsResponse =
        await fertilizerSuggestionsRequest.json();
      console.log(
        "🚀 ~ getPropSuggestions ~ fertilizerSuggestionsResponse:",
        fertilizerSuggestionsResponse,
      );
      if (fertilizerSuggestionsRequest.ok) {
        if (fertilizerSuggestionsResponse.error) {
          setError(fertilizerSuggestionsResponse.error);
          return;
        }
        setData(fertilizerSuggestionsResponse);
        if (nutrientResults?.resultId) {
          await setDoc(
            doc(
              db,
              "soil-test",
              user!.uid,
              "reports",
              nutrientResults.resultId,
            ),
            {
              suggestions: fertilizerSuggestionsResponse,
              cropWanted: fertilizerName,
            },
            { merge: true },
          );
        }
      } else {
        Alert.alert("Error", fertilizerSuggestionsResponse.error);
        setError(fertilizerSuggestionsResponse.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          "🚀 ~ getPropSuggestions ~ error:",
          error.name,
          error.message,
          // error.stack,
        );
        Alert.alert("Error", error.message);
        setError({ error: error.message });
      } else {
        Alert.alert("Error", "Unknown error");
        console.log("🚀 ~ getPropSuggestions ~ error:", error);
      }
      setError({
        error: "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Header />
      <Text className="text-lg font-bold w-full">
        Which crop would you like to grow?
      </Text>
      <View className="w-full relative">
        <TextInput
          inputMode="search"
          value={fertilizerName}
          onChangeText={setFertilizerName}
          placeholder="Search for crops..."
          className="border border-grey-text/20 bg-gray-100 w-full rounded-md p-3 text-lg"
        />
        <TouchableOpacity className="p-2 rounded-md bg-lime-500 absolute right-1 top-1/2 -translate-y-6">
          <MaterialIcons name="search" color={"white"} size={30} />
        </TouchableOpacity>
      </View>
      <TextInput
        inputMode="search"
        placeholder="Land area name..."
        className="border border-grey-text/20 bg-gray-100 w-full rounded-md p-3 text-lg"
      />
      <Button
        className="rounded-full"
        onPress={async () => {
          getFertilizerSuggestions();
        }}
        disabled={isLoading}
      >
        Suggest fertilizers
      </Button>

      {/* Mock of how the data should be displayed */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: "100%",
          rowGap: 12,
        }}
      >
        {data?.nutrient_suggestions.map((sugg, i) => (
          <FertilizerCard
            key={i}
            fertilizerName={sugg.nutrient}
            // content="+21"
            // unit="mg/kg"
            description={sugg.suggestion}
            // formula="N"
          />
        ))}
      </ScrollView>
    </DashboardLayout>
  );
}
