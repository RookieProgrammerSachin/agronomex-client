import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import useAuth from "@/hooks/useAuth";

export default function Index() {
  const { user, isLoading } = useAuth();

  // Redirect to dashboard if user is logged in
  if (!isLoading && user) {
    return <Redirect href="/home" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image source={require("@/assets/images/logo.png")} />
      <Link href={"/login"} className="mt-6">
        <Ionicons name="arrow-forward-outline" size={30} />
      </Link>
    </View>
  );
}