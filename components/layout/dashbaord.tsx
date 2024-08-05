import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function dashbaord({ children }: React.PropsWithChildren) {
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          gap: 20,
          backgroundColor: "white",
          paddingHorizontal: 20,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
