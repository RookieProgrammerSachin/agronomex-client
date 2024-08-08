import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { DashboardLayout } from "@/components/layout";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";

export default function FertilizerRecommendation() {
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
      <Button className="rounded-full">Suggest fertilizers</Button>
    </DashboardLayout>
  );
}
