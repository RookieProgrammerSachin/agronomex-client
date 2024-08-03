import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function DeviceConnectionIndicator() {
    const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  return (
    <View style={{
        width: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isDeviceConnected? "#0DB1AD10": "#D2416E10",
        borderRadius: 12,
        justifyContent: "space-around"
    }}>
        <Ionicons name={isDeviceConnected? 'link': 'unlink'} size={24} />
        <Text style={{
            color: isDeviceConnected? "#0DB1AD": "#D2416E",
            fontSize: 20
        }}>{isDeviceConnected? "Device Connected": "Device Disconnected"}</Text>

        <Pressable
            style={{
                backgroundColor: isDeviceConnected? "#D2416E10": "#0DB1AD10",
                padding: 10,
                borderRadius: 100
            }}
            onPress={() => setIsDeviceConnected(!isDeviceConnected)}
        >
            <Text style={{
                color: isDeviceConnected? "#D2416E": "#0DB1AD",
                fontSize: 18
            }}>{isDeviceConnected? "Disconnect": "Connect"}</Text>
        </Pressable>
    </View>
  )
}