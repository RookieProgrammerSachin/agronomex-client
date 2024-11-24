import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { DashboardLayout } from "@/components/layout";
import Header from "@/components/Header";
import { useNutrientResultContext } from "@/context/NutrientResultContext";

type RecommendationCardProps = {
  imageURL: ReturnType<NodeRequire>;
  cropName: string;
  cropDesc: string;
  increasePercent: string | number;
};

function RecommendationCard({
  imageURL,
  cropName,
  cropDesc,
  increasePercent,
}: RecommendationCardProps) {
  return (
    <View className="shadow-black/30 shadow-xl gap-y-2 rounded-xl p-6 border border-black/5 flex flex-col">
      <View className="w-full relative h-48">
        <Image
          source={imageURL}
          resizeMode="cover"
          className="w-full rounded-md"
        />
        <Text className="absolute right-0 -bottom-1 w-fit p-2 rounded-md bg-lime-50 text-lime-500 text-sm">
          {increasePercent}% increased yield
        </Text>
      </View>
      <Text className="text-xl font-semibold">{cropName}</Text>
      <Text className="text-sm">{cropDesc}</Text>
    </View>
  );
}

const cropSuggestions: RecommendationCardProps[] = [
  {
    imageURL: require("@/assets/images/paddy.png"),
    cropName: "Paddy",
    increasePercent: 11,
    cropDesc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta cumque obcaecati laborum odit ut adipisci nostrum excepturi nesciunt a quae!",
  },
  {
    imageURL: require("@/assets/images/sugarcane.png"),
    cropName: "Sugarcane",
    increasePercent: 11,
    cropDesc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta cumque obcaecati laborum odit ut adipisci nostrum excepturi nesciunt a quae!",
  },
  {
    imageURL: require("@/assets/images/wheat.png"),
    cropName: "Wheat",
    increasePercent: 11,
    cropDesc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta cumque obcaecati laborum odit ut adipisci nostrum excepturi nesciunt a quae!",
  },
  {
    imageURL: require("@/assets/images/ragi.png"),
    cropName: "Ragi",
    increasePercent: 11,
    cropDesc:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta cumque obcaecati laborum odit ut adipisci nostrum excepturi nesciunt a quae!",
  },
];

export default function CropRecommendation() {
  const nutrientResults = useNutrientResultContext();
  return (
    <DashboardLayout>
      <Header />

      <View className="w-full bg-lime-100 p-4 rounded-lg">
        <Text className="text-lime-600 text-xl font-semibold">
          Crop recommendation
        </Text>
      </View>

      <Text className="text-sm font-mono">
        {JSON.stringify(nutrientResults?.results)}
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // flex: 1,
          width: "100%",
          rowGap: 12,
        }}
      >
        {cropSuggestions.map((suggestion, i) => (
          <RecommendationCard {...suggestion} key={i} />
        ))}
      </ScrollView>
    </DashboardLayout>
  );
}
