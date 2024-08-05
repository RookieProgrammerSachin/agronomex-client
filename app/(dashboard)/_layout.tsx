import React from "react";
import { Stack } from "expo-router";
import { DeviceConnectivityContextProvider } from "@/context/DeviceConnectivityContext";

export default function Layout() {
  return (
    <DeviceConnectivityContextProvider>
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
      </Stack>
    </DeviceConnectivityContextProvider>
  );
}
