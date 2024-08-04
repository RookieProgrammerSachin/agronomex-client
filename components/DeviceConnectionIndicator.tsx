import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDeviceConnectivityContext } from "@/context/DeviceConnectivityContext";

export default function DeviceConnectionIndicator() {
  const deviceConnectionContext = useDeviceConnectivityContext();

  return (
    <View
      style={{
        width: "100%",
        padding: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: deviceConnectionContext?.isDeviceConnected
          ? "#0DB1AD10"
          : "#D2416E10",
        borderRadius: 12,
        justifyContent: "space-around",
      }}
    >
      <Ionicons
        name={deviceConnectionContext?.isDeviceConnected ? "link" : "unlink"}
        size={24}
      />
      <Text
        style={{
          color: deviceConnectionContext?.isDeviceConnected
            ? "#0DB1AD"
            : "#D2416E",
          fontSize: 20,
        }}
      >
        {deviceConnectionContext?.isDeviceConnected
          ? "Device Connected"
          : "Device Disconnected"}
      </Text>

      <Pressable
        style={{
          backgroundColor: deviceConnectionContext?.isDeviceConnected
            ? "#D2416E10"
            : "#0DB1AD10",
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 100,
        }}
        onPress={() =>
          deviceConnectionContext?.setIsDeviceConnected(
            !deviceConnectionContext?.isDeviceConnected,
          )
        }
      >
        <Text
          style={{
            color: deviceConnectionContext?.isDeviceConnected
              ? "#D2416E"
              : "#0DB1AD",
            fontSize: 18,
          }}
        >
          {deviceConnectionContext?.isDeviceConnected
            ? "Disconnect"
            : "Connect"}
        </Text>
      </Pressable>
    </View>
  );
}
