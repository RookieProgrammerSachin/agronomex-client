import { DeviceConnectivityContextProvider } from "@/context/DeviceConnectivityContext";
import { NutrientResultContextProvider } from "@/context/NutrientResultContext";
import useAuth from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function Layout() {
  const { user, isLoading } = useAuth();

  // Show loading state if still checking auth
  if (isLoading) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect href="/" />;
  }

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
          <Stack.Screen
            name="history/[docId]"
            options={({ route }) => ({
              headerShown: false,
              // @ts-expect-error docid illa
              title: route?.params?.docId,
            })}
          />
        </Stack>
      </NutrientResultContextProvider>
    </DeviceConnectivityContextProvider>
  );
}
