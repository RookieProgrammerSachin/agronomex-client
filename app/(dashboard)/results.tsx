import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { router } from "expo-router";
import { API_URL } from "@/constants/url";

type NutrientInfoBoxType = {
  nutrientFormula: string;
  nutrientName: string;
  nutrientQty: string;
  nutrientUnit: string;
  boxColor: string;
  textColor: string;
};

function NutrientInfoBox({
  nutrientFormula,
  nutrientName,
  nutrientQty,
  nutrientUnit,
  boxColor,
  textColor,
}: NutrientInfoBoxType) {
  return (
    <View
      className={
        "w-40 h-40 p-4 flex m-2 rounded-lg " +
        boxColor +
        ` shadow-lg shadow-[${boxColor}]/40`
      }
    >
      <View className="flex flex-row items-end gap-x-4">
        <Text className={"text-3xl font-semibold " + textColor}>
          {nutrientFormula}
        </Text>
        <Text className={"text-lg font-semibold " + textColor}>
          {nutrientName}
        </Text>
      </View>
      <View className="flex flex-row items-center gap-x-4 flex-1">
        <Text className={"text-4xl " + textColor}>{nutrientQty}</Text>
        <Text className={"text-lg " + textColor}>{nutrientUnit}</Text>
      </View>
    </View>
  );
}

const nutrientsInfo = [
  {
    boxColor: "bg-[#B1840D10]",
    textColor: "text-[#B1840D]",
    nutrientFormula: "N",
    nutrientName: "Nitrogen",
    nutrientQty: "78",
    nutrientUnit: "kg/ha",
  },
  {
    boxColor: "bg-[#7042C910]",
    textColor: "text-[#7042C9]",
    nutrientFormula: "P",
    nutrientName: "Phosphorus",
    nutrientQty: "124",
    nutrientUnit: "kg/ha",
  },
  {
    boxColor: "bg-[#0DB1AD10]",
    textColor: "text-[#0DB1AD]",
    nutrientFormula: "K",
    nutrientName: "Potassium",
    nutrientQty: "99",
    nutrientUnit: "kg/ha",
  },
  {
    boxColor: "bg-[#63B10D10]",
    textColor: "text-[#63B10D]",
    nutrientFormula: "pH",
    nutrientName: "",
    nutrientQty: "8.01",
    nutrientUnit: "",
  },
  {
    boxColor: "bg-[#D2416E10]",
    textColor: "text-[#D2416E]",
    nutrientFormula: "Temp",
    nutrientName: "",
    nutrientQty: "36",
    nutrientUnit: "C",
  },
  {
    boxColor: "bg-[#197BD210]",
    textColor: "text-[#197BD2]",
    nutrientFormula: "Humidity",
    nutrientName: "",
    nutrientQty: "78",
    nutrientUnit: "%",
  },
];

export default function results() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | { error: string }>(null);
  const [cropsdata, setCropsData] = useState(null);
  const [isCropsLoading, setIsCropsLoading] = useState(false);
  const [croperror, setCropError] = useState<null | { error: string }>(null);

  async function getFertilizerSuggestions() {
    try {
      setIsLoading(true);
      setError(null);
      const fertilizerSuggestionsRequest = await fetch(API_URL + "/", {
        method: "POST",
        body: JSON.stringify({
          ellam: "bs",
        }),
      });
      const fertilizerSuggestionsResponse =
        await fertilizerSuggestionsRequest.json();
      console.log(
        "🚀 ~ getPropSuggestions ~ fertilizerSuggestionsResponse:",
        fertilizerSuggestionsResponse,
      );
      if (!fertilizerSuggestionsRequest.ok) {
        setError(fertilizerSuggestionsResponse);
        return;
      }
      if (fertilizerSuggestionsRequest.ok) {
        setData(fertilizerSuggestionsResponse);
        router.push("/fertilizer-recomm");
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

  async function getCropSuggestions() {
    try {
      setIsCropsLoading(true);
      setCropError(null);
      const cropSuggestionsRequest = await fetch(API_URL + "/", {
        method: "POST",
        body: JSON.stringify({
          ellam: "bs",
        }),
      });
      const cropSuggestionsResponse = await cropSuggestionsRequest.json();
      console.log(
        "🚀 ~ getCropsSuggestions ~ cropSuggestionsResponse:",
        cropSuggestionsResponse,
      );
      if (!cropSuggestionsRequest.ok) {
        setCropError(cropSuggestionsResponse);
        return;
      }
      if (cropSuggestionsRequest.ok) {
        setCropsData(cropSuggestionsResponse);
        router.push("/fertilizer-recomm");
      } else {
        Alert.alert("Error", cropSuggestionsResponse.error);
        setCropError({ error: cropSuggestionsResponse.error });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          "🚀 ~ getCropsSuggestions ~ error:",
          error.name,
          error.message,
          // error.stack,
        );
        Alert.alert("Error", error.message);
        setCropError({ error: error.message });
      } else {
        Alert.alert("Error", "Unknown error!");
        console.log("🚀 ~ getCropsSuggestions ~ error:", error);
      }
      setCropError({
        error: "Unknown error",
      });
    } finally {
      setIsCropsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Header />
      <Text className="text-2xl text-left w-full">Results</Text>

      <View className={`flex flex-row flex-wrap justify-center w-full flex-1`}>
        <ScrollView
          className={`w-full h-full flex-1 flex-row flex-wrap`}
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {nutrientsInfo.map((nutrient, i) => (
            <NutrientInfoBox {...nutrient} key={i} />
          ))}
        </ScrollView>
      </View>
      <View className="flex-col gap-y-1 items-center w-full">
        <Button
          onPress={() => {
            getFertilizerSuggestions();
          }}
          disabled={isLoading}
        >
          Suggest Fertilizers
        </Button>
        <Button disabled={isCropsLoading} onPress={() => getCropSuggestions()}>
          Suggest Crops
        </Button>
      </View>
    </DashboardLayout>
  );
}
