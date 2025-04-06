import Header from "@/components/Header";
import { DashboardLayout } from "@/components/layout";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { useNutrientResultContext } from "@/context/NutrientResultContext";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { formatDate } from "@/utils/date";

export default function Manual() {
  const [nutrients, setNutrients] = useState({
    N: "",
    P: "",
    K: "",
    pH: "",
    Temp: "",
    Humidity: "",
    EC: "",
    OC: "",
    S: "",
    Zn: "",
    Fe: "",
    Cu: "",
    Mn: "",
    B: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const nutrientResults = useNutrientResultContext();
  const { user } = useAuth();

  const handleChange = (name: string, value: string) => {
    setNutrients((prev) => ({ ...prev, [name]: value }));
  };

  async function submitNutrientValues() {
    // Validate all inputs are valid numbers
    const invalidInputs = Object.entries(nutrients).filter(
      ([nutrient, value]) => {
        // Check if value is not empty and is not a valid number
        return (value !== "" && isNaN(Number(value))) || !value.trim();
      },
    );

    if (invalidInputs.length > 0) {
      const invalidNutrients = invalidInputs
        .map(([nutrient]) => nutrient)
        .join(", ");
      Alert.alert(
        "Invalid Input",
        `Please enter valid numbers for: ${invalidNutrients}`,
      );
      return;
    }

    try {
      setIsLoading(true);
      const nutrientsDataPrepared = Object.entries(nutrients).map(
        ([nutrient, value]) => ({
          nutrient,
          value: value || 0,
        }),
      );

      const docID = formatDate(new Date());
      nutrientResults?.setResults(nutrientsDataPrepared);
      nutrientResults?.setResultId(docID);

      const userDocRef = doc(db, "soil-test", user!.uid);
      await setDoc(doc(userDocRef, "reports", docID), {
        createdAt: new Date(),
        nutrients: Object.fromEntries(
          nutrientsDataPrepared.map((x) => [x.nutrient, x.value]),
        ),
      });

      router.push("/fertilizer-recomm");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error submitting manual values:", error.message);
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Unknown error occurred while submitting values");
        console.log("Unknown error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Header />
      <View className="gap-y-2 mb-4 flex-col w-full flex">
        <Text className="text-2xl text-left w-full">
          Enter nutrient values manually
        </Text>
        <Text className="text-left text-gray-500 w-full">
          Use this form to enter the nutrient values manually. Make sure to
          double-check the values for accuracy.
        </Text>
      </View>

      <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
        {Object.keys(nutrients).map((nutrient) => (
          <View
            key={nutrient}
            className="flex-row items-center justify-between mb-4 px-4"
          >
            <Text className="text-lg font-medium w-1/3">{nutrient}</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 w-2/3 bg-white"
              placeholder={`Enter ${nutrient} value`}
              value={nutrients[nutrient as keyof typeof nutrients]}
              onChangeText={(value) => handleChange(nutrient, value)}
              keyboardType="numeric"
            />
          </View>
        ))}
      </ScrollView>

      <View className="flex-col gap-y-1 items-center w-full">
        <Button onPress={submitNutrientValues}>
          {isLoading ? <ActivityIndicator color="#ffffff" /> : "Submit Results"}
        </Button>
      </View>
    </DashboardLayout>
  );
}
