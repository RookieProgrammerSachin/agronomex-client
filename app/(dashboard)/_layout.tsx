import React from "react";
import { Stack } from "expo-router";
import { DeviceConnectivityContextProvider } from "@/context/DeviceConnectivityContext";
import { NutrientResultContextProvider } from "@/context/NutrientResultContext";

export default function Layout() {
  return (
    <DeviceConnectivityContextProvider>
      <NutrientResultContextProvider>
        <Stack>
          <Stack.Screen
            name="home"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="results"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="crop-recomm"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="fertilizer-recomm"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </NutrientResultContextProvider>
    </DeviceConnectivityContextProvider>
  );
}
