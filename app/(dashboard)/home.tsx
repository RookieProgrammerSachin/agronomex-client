import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceConnectionIndicator from '@/components/DeviceConnectionIndicator';

export default function index() {

  return (
    <SafeAreaView>
        <View style={{
            display: "flex",
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
            <DeviceConnectionIndicator />

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