import { Stack } from "expo-router";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="(dashboard)" options={{
          headerShown: false
        }} />
        <Stack.Screen name="index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="login" options={{
          headerShown: false
        }} />
        <Stack.Screen name="register" options={{
          headerShown: false
        }} />
        <Stack.Screen name="forgot" options={{
          headerShown: false
        }} />
      </Stack>
    </AuthContextProvider>
  );
}