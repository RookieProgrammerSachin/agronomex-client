import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceConnectionIndicator from "@/components/DeviceConnectionIndicator";
import HomeTabs from "@/components/HomeTabs";
import Header from "@/components/Header";
import { DashboardLayout } from "@/components/layout";
import { Redirect } from "expo-router";

export default function index() {
  // return <Redirect href={"/settings"} />;

  return (
    <DashboardLayout>
      <Header />

      {/* Device connection status */}
      <DeviceConnectionIndicator />

      {/* Test vs History Tabs */}
      <HomeTabs />
    </DashboardLayout>
  );
}
