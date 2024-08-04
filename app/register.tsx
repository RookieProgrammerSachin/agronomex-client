import { View, Text, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

export default function register() {
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          gap: 20,
          backgroundColor: "white",
          paddingHorizontal: 20,
        }}
      >
        <Image source={require("@/assets/images/logo.png")} />
        <Text>Create an account</Text>

        {/* Text input for name */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Name"
        ></TextInput>

        {/* Email input */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Email"
        ></TextInput>

        {/* Text input for password */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Confirm Password"
          secureTextEntry
        ></TextInput>

        {/* Text input for password confirmation */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Password"
          secureTextEntry
        ></TextInput>

        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "#6FCB4F",
            width: "100%",
            borderRadius: 10,
          }}
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text
            style={{
              color: "#eee",
              fontWeight: 600,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Create my account
          </Text>
        </Pressable>

        <Text>
          Already have an account?{" "}
          <Link
            href={"/login"}
            style={{
              width: "100%",
              textAlign: "right",
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
            }}
          >
            Log in
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
