import Button from "@/components/Button";
import Header from "@/components/Header";
import { DashboardLayout } from "@/components/layout";
import { API_URL } from "@/constants/url";
import { useNutrientResultContext } from "@/context/NutrientResultContext";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

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
      <View className="flex flex-row items-center gap-x-2 flex-1">
        <Text className={"text-4xl " + textColor}>{nutrientQty}</Text>
        <Text className={"text-lg " + textColor}>{nutrientUnit}</Text>
      </View>
    </View>
  );
}

export default function results() {
  const [cropsdata, setCropsData] = useState(null);
  const [isCropsLoading, setIsCropsLoading] = useState(false);
  const [cropError, setCropError] = useState<null | { error: string }>(null);
  const nutrientResults = useNutrientResultContext();

  const nutrientsInfo = useMemo(() => {
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
      {
        boxColor: "bg-[#63B10D10]",
        textColor: "text-[#63B10D]",
        nutrientFormula: "EC",
        nutrientName: "",
        nutrientQty: "0.00",
        nutrientUnit: "S/cm",
      },
      {
        boxColor: "bg-[#D2416E10]",
        textColor: "text-[#D2416E]",
        nutrientFormula: "OC",
        nutrientName: "",
        nutrientQty: "0.0",
        nutrientUnit: "%",
      },
      {
        boxColor: "bg-[#B1840D10]",
        textColor: "text-[#B1840D]",
        nutrientFormula: "S",
        nutrientName: "",
        nutrientQty: "0.0",
        nutrientUnit: "ppm",
      },
      {
        boxColor: "bg-[#7042C910]",
        textColor: "text-[#7042C9]",
        nutrientFormula: "Zn",
        nutrientName: "",
        nutrientQty: "0.0",
        nutrientUnit: "ppm",
      },
      {
        boxColor: "bg-[#63B10D10]",
        textColor: "text-[#63B10D]",
        nutrientFormula: "Fe",
        nutrientName: "",
        nutrientQty: "0.0",
        nutrientUnit: "ppm",
      },
      {
        boxColor: "bg-[#63B10D10]",
        textColor: "text-[#63B10D]",
        nutrientFormula: "Cu",
        nutrientName: "",
        nutrientQty: "0.0",
        nutrientUnit: "ppm",
      },
      {
        boxColor: "bg-[#63B10D10]",
        textColor: "text-[#63B10D]",
        nutrientFormula: "Mn",
        nutrientName: "",
        nutrientQty: "0.0",
        nutrientUnit: "ppm",
      },
      {
        boxColor: "bg-[#197BD210]",
        textColor: "text-[#197BD2]",
        nutrientFormula: "B",
        nutrientName: "",
        nutrientQty: "0.0",
        nutrientUnit: "ppm",
      },
    ];

    // Define ranges for each nutrient
    const ranges = {
      N: { min: 70, max: 90 }, // Nitrogen in kg/ha
      P: { min: 80, max: 130 }, // Phosphorus in kg/ha
      K: { min: 70, max: 110 }, // Potassium in kg/ha
      pH: { min: 6, max: 9 }, // pH level
      Temp: { min: 32, max: 45 }, // Temperature in °C
      Humidity: { min: 60, max: 90 }, // Humidity in %
      EC: { min: 0.1, max: 4.0 }, // Electrical Conductivity in S/cm
      OC: { min: 0.5, max: 2.5 }, // Organic Carbon in %
      S: { min: 10, max: 50 }, // Sulfur in ppm
      Zn: { min: 0.5, max: 10 }, // Zinc in ppm
      Fe: { min: 2, max: 50 }, // Iron in ppm
      Cu: { min: 0.2, max: 5 }, // Copper in ppm
      Mn: { min: 1, max: 50 }, // Manganese in ppm
      B: { min: 0.2, max: 5 }, // Boron in ppm
    };

    // Function to generate a random number within a given range with up to 2 decimal places
    function getRandomInRange(min: number, max: number) {
      return (Math.random() * (max - min) + min).toFixed(2);
    }

    // Modify the nutrientQty based on the defined ranges
    nutrientsInfo.forEach((nutrient) => {
      const { nutrientFormula } = nutrient;
      if (
        // @ts-expect-error chi
        ranges[
          nutrientFormula as (typeof nutrientsInfo)[number]["nutrientFormula"]
        ]
      ) {
        // @ts-expect-error chi
        const { min, max } = ranges[nutrientFormula];
        nutrient.nutrientQty = getRandomInRange(min, max);
      }
    });

    return nutrientsInfo;
  }, []);

  const nutrientsDataPrepared = useMemo(
    () =>
      nutrientsInfo.map((nutr) => ({
        nutrient: nutr.nutrientFormula,
        value: nutr.nutrientQty,
      })),
    [nutrientsInfo],
  );

  async function getCropSuggestions() {
    try {
      setIsCropsLoading(true);
      setCropError(null);
      const cropSuggestionsRequest = await fetch(API_URL + "/crops", {
        method: "POST",
        body: JSON.stringify(nutrientsDataPrepared),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cropSuggestionsResponse = await cropSuggestionsRequest.json();
      console.log(
        "🚀 ~ getCropsSuggestions ~ cropSuggestionsResponse:",
        cropSuggestionsResponse,
      );

      if (cropSuggestionsRequest.ok) {
        setCropsData(cropSuggestionsResponse);
        nutrientResults?.setResults(nutrientsDataPrepared);
        router.push("/crop-recomm");
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
            nutrientResults?.setResults(nutrientsDataPrepared);
            router.push("/fertilizer-recomm");
          }}
        >
          Suggest Fertilizers
        </Button>
        <Button disabled={true}>Suggest Crops</Button>
      </View>
    </DashboardLayout>
  );
}
