import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function Header() {
  return (
    <>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingVertical: 10,
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          resizeMode={"contain"}
          style={{
            display: "flex",
            width: 150,
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          style={{
            display: "flex",
            position: "absolute",
            right: "1%",
          }}
          onPress={() => router.push("/settings")}
        >
          <Image source={require("@/assets/images/user.png")} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        Welcome farmer!
      </Text>
    </>
  );
}
