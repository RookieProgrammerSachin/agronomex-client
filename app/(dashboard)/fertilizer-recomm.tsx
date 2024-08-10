import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";

type FertilizerCardType = {
  formula: string;
  fertilizerName: string;
  description: string;
  content: string;
  unit: string;
};

function FertilizerCard({
  formula,
  fertilizerName,
  description,
  content,
  unit,
}: FertilizerCardType) {
  return (
    <View className="w-[92vw] flex-row rounded-lg border border-blue-400/50 p-1">
      {/* Nutrient Logo Box */}
      <View className="w-18 aspect-square rounded-md bg-blue-400 items-center justify-center p-2">
        <Text className="text-3xl text-white">{formula}</Text>
      </View>
      <View className="w-full ml-5">
        <Text className="text-blue-400 font-semibold text-lg">
          {fertilizerName}
        </Text>
        <Text className="text-blue-400">{description}</Text>
        <Text className="text-blue-400 font-bold text-lg">
          {content} {unit}
        </Text>
      </View>
    </View>
  );
}

export default function FertilizerRecommendation() {
  const [showResults, setShowResults] = useState(false);

  return (
    <DashboardLayout>
      <Header />
      <Text className="text-lg font-bold w-full">
        Which crop would you like to grow?
      </Text>
      <View className="w-full relative">
        <TextInput
          inputMode="search"
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
      <Button className="rounded-full" onPress={() => setShowResults(true)}>
        Suggest fertilizers
      </Button>

      {/* Mock of how the data should be displayed */}
      {showResults && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: "100%",
            rowGap: 12,
          }}
        >
          <FertilizerCard
            fertilizerName="Alfalfa / Bloodmeal"
            content="+21"
            unit="mg/kg"
            description="To increase Nitrogen content, add"
            formula="N"
          />
          <FertilizerCard
            fertilizerName="Muriate"
            content="+18"
            unit="kg/Ha"
            description="To increase Nitrogen content, add"
            formula="M"
          />
        </ScrollView>
      )}
    </DashboardLayout>
  );
}
