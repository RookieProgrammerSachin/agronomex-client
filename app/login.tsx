import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import useAuth from "@/hooks/useAuth";

function LoginPage() {
  const { login, isLoading, error, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) return;
    await login(email, password);
  };

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
        <Text>Login to your account</Text>

        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}

        {/* Text input for email */}
        <TextInput
          style={{
            borderColor: "#eaeaea",
            borderWidth: 1,
            width: "100%",
            backgroundColor: "#eee",
            shadowColor: "#333",
            shadowOpacity: 100,
            shadowRadius: 10,
            padding: 10,
            borderRadius: 10,
            fontSize: 18,
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Text input for password */}
        <TextInput
          style={{
            borderColor: "#eaeaea",
            borderWidth: 1,
            width: "100%",
            backgroundColor: "#eee",
            shadowColor: "#333",
            shadowOpacity: 100,
            shadowRadius: 10,
            padding: 10,
            borderRadius: 10,
            fontSize: 18,
          }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Link
          href={"/forgot"}
          style={{
            width: "100%",
            textAlign: "right",
          }}
        >
          Forgot password?
        </Link>

        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "#6FCB4F",
            width: "100%",
            borderRadius: 10,
            opacity: isLoading ? 0.7 : 1,
          }}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text
              style={{
                color: "#eee",
                fontWeight: 600,
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Login
            </Text>
          )}
        </Pressable>

        <Text>
          Don't have an account?{" "}
          <Link
            href={"/register"}
            style={{
              width: "100%",
              textAlign: "right",
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
            }}
          >
            Create an account
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;