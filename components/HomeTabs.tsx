import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDeviceConnectivityContext } from "@/context/DeviceConnectivityContext";
import { router } from "expo-router";

export default function HomeTabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const deviceConnectionContext = useDeviceConnectivityContext();

  /** Actual routine that kick starts the soil testing process */
  function startTestRoutine() {
    // For now, there is no testing logic, but will fill up soon
    return router.push("/results");
  }

  return (
    <View className="w-full gap-y-3">
      {/* Tabs button container */}
      <View className="flex flex-row items-center justify-left">
        <Pressable
          className={`${activeTab === 0 ? "bg-lime-400 shadow-xl shadow-black/50" : "bg-white"} px-8 py-2 rounded-md`}
          onPress={() => setActiveTab(0)}
        >
          <Text
            className={`${activeTab === 0 ? "font-semibold text-white" : "font-normal text-grey-text"} text-base`}
          >
            Test
          </Text>
        </Pressable>
        <Pressable
          className={`${activeTab === 1 ? "bg-lime-400" : "bg-white"} px-8 py-2 rounded-md`}
          onPress={() => setActiveTab(1)}
        >
          <Text
            className={`${activeTab === 1 ? "font-semibold text-white" : "text-grey-text font-normal"} text-base`}
          >
            History
          </Text>
        </Pressable>
      </View>

      {/* Tabs panel container */}
      <View className="flex w-full">
        <View className="items-center justify-center border-2 p-4 border-dashed border-lime-500">
          {activeTab === 0 && (
            <>
              <Image
                source={require("@/assets/images/soil-test.png")}
                className="w-64"
                resizeMode="contain"
              />
              <Text className="text-grey-text text-lg">
                Test your soil for analysis
              </Text>
              <Pressable
                className={`rounded-md ${deviceConnectionContext?.isDeviceConnected ? "bg-lime-400" : "bg-gray-300"} mt-4 w-full px-6 items-center py-3`}
                disabled={!deviceConnectionContext?.isDeviceConnected}
                onPress={startTestRoutine}
              >
                <Text className={`text-lg text-white font-semibold`}>
                  Test now
                </Text>
              </Pressable>
            </>
          )}
          {activeTab === 1 && (
            <>
              <Text>Your history</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
