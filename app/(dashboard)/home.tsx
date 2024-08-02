import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function index() {
  
    const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  return (
    <SafeAreaView style={{
        // paddingTop: "5%"
    }}>
        <View style={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: 20,
            backgroundColor: "white",
            paddingHorizontal: 20
        }}>
            <View style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", 
                flexDirection: "row",
                paddingVertical: 10
            }}>
                <Image source={require("@/assets/images/logo.png")} resizeMode={"contain"} style={{
                    display: "flex",
                    width: 150
                }} />
                <Image source={require("@/assets/images/user.png")} style={{
                    display: "flex",
                    marginLeft: "auto"
                }} />
            </View>
            <Text style={{
                fontSize: 20
            }}>Welcome farmer!</Text>

            {/* Device connection status */}
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

            {/* Test vs History Tabs */}
            <View>
                {/* Tabs container */}
                <View>
                    <Pressable>
                        <Text>Test</Text>
                    </Pressable>
                    <Pressable>
                        <Text>History</Text>
                    </Pressable>
                </View>

                {/* Content box */}
                <View>

                </View>
            </View>
        </View>
        </SafeAreaView>
  )
}