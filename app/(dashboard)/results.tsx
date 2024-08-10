import { View, Text, ScrollView } from "react-native";
import React from "react";
import { DashboardLayout } from "@/components/layout";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { router } from "expo-router";

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

export default function results() {
  const nutrientsInfo = [
    {
      boxColor: "bg-[#B1840D10]",
      textColor: "text-[#B1840D]",
      nutrientFormula: "N",
      nutrientName: "Nitrogen",
      nutrientQty: "78",
      nutrientUnit: "kg/ha",
    },
  ];

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
          <NutrientInfoBox
            boxColor="bg-[#B1840D10]"
            textColor="text-[#B1840D]"
            nutrientFormula="N"
            nutrientName="Nitrogen"
            nutrientQty="78"
            nutrientUnit="kg/ha"
          />
          <NutrientInfoBox
            boxColor="bg-[#7042C910]"
            textColor="text-[#7042C9]"
            nutrientFormula="P"
            nutrientName="Phosphorus"
            nutrientQty="124"
            nutrientUnit="kg/ha"
          />
          <NutrientInfoBox
            boxColor="bg-[#0DB1AD10]"
            textColor="text-[#0DB1AD]"
            nutrientFormula="K"
            nutrientName="Potassium"
            nutrientQty="99"
            nutrientUnit="kg/ha"
          />
          <NutrientInfoBox
            boxColor="bg-[#63B10D10]"
            textColor="text-[#63B10D]"
            nutrientFormula="pH"
            nutrientName=""
            nutrientQty="8.01"
            nutrientUnit=""
          />
          <NutrientInfoBox
            boxColor="bg-[#D2416E10]"
            textColor="text-[#D2416E]"
            nutrientFormula="Temp"
            nutrientName=""
            nutrientQty="36"
            nutrientUnit="C"
          />
          <NutrientInfoBox
            boxColor="bg-[#197BD210]"
            textColor="text-[#197BD2]"
            nutrientFormula="Humidity"
            nutrientName=""
            nutrientQty="78"
            nutrientUnit="%"
          />
        </ScrollView>
      </View>
      <View className="flex-col gap-y-1 items-center w-full">
        <Button onPress={() => router.push("/fertilizer-recomm")}>
          Suggest Fertilizers
        </Button>
        <Button onPress={() => router.push("/crop-recomm")}>
          Suggest Crop
        </Button>
      </View>
    </DashboardLayout>
  );
}
