import { View, Text, Image } from "react-native";
import React from "react";

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
          }}
        />
        <Image
          source={require("@/assets/images/user.png")}
          style={{
            display: "flex",
            marginLeft: "auto",
          }}
        />
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
