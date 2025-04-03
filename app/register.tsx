import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import { FirebaseError } from "firebase/app";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      // Registration successful, navigate to login
      Alert.alert("Success", "Account created successfully. Please sign in.");
      router.push("/login");
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle specific firebase errors
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email is already in use");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email address");
        } else if (error.code === "auth/weak-password") {
          setError("Password is too weak");
        } else {
          setError("Failed to create account. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
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
        <Text style={{ fontSize: 24, fontWeight: "600" }}>
          Create an account
        </Text>

        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}

        {/* Text input for name */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        {/* Email input */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password input */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password input */}
        <TextInput
          className="border border-[#eaeaea] w-full bg-[#eee] shadow-sm shadow-[#333] p-3 rounded-md text-lg"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "#6FCB4F",
            width: "100%",
            borderRadius: 10,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
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
              Create my account
            </Text>
          )}
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
