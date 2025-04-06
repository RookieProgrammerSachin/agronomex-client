import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Href, Link, router } from "expo-router";
import { useDeviceConnectivityContext } from "@/hooks/useDeviceConnectivityContext";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { formatDate, toLocaleDate } from "@/utils/date";
import { TestType } from "@/utils/types";

export default function HomeTabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const deviceConnectionContext = useDeviceConnectivityContext();
  const [previousTests, setPreviousTests] = useState<TestType[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const { user } = useAuth();

  /** Actual routine that kick starts the soil testing process */
  function startTestRoutine() {
    // For now, there is no testing logic, but will fill up soon
    return router.push("/results");
  }

  useEffect(() => {
    getData();

    async function getData() {
      if (activeTab === 1 && previousTests.length === 0) {
        try {
          setHistoryLoading(true);
          const history = await getDocs(
            collection(db, "soil-test", user!.uid, "reports"),
          );
          const data = history.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setPreviousTests(data as TestType[]);
          setHistoryLoading(false);
        } catch (error) {
          setHistoryLoading(false);
          console.log("🚀 ~ firebase fetch ~ error:", error);
          Alert.alert("Something went wrong when fetching your data!");
        }
      }
    }
  }, [activeTab]);

  return (
    <View className="w-full flex-1 gap-y-3">
      {/* Tabs button container */}
      <View className="flex flex-row items-center justify-left">
        <Pressable
          className={`${activeTab === 0 ? "bg-lime-400 shadow-xl shadow-black/50" : "bg-white"} px-8 py-2 rounded-md`}
          onPress={() => setActiveTab(0)}
        >
          <Text
            className={`${activeTab === 0 ? "font-semibold text-white" : "font-normal text-grey-text"} text-base`}
          >
            Test
          </Text>
        </Pressable>
        <Pressable
          className={`${activeTab === 1 ? "bg-lime-400" : "bg-white"} px-8 py-2 rounded-md`}
          onPress={() => setActiveTab(1)}
        >
          <Text
            className={`${activeTab === 1 ? "font-semibold text-white" : "text-grey-text font-normal"} text-base`}
          >
            History
          </Text>
        </Pressable>
      </View>

      {/* Tabs panel container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: "100%",
          rowGap: 5,
        }}
        className="border-2 p-4 border-dashed border-lime-500"
      >
        {activeTab === 0 && (
          <View className="flex items-center justify-center">
            <Image
              source={require("@/assets/images/soil-test.png")}
              className="w-64"
              resizeMode="contain"
            />
            <Text className="text-grey-text text-lg">
              Test your soil for analysis
            </Text>
            <Pressable
              className={`rounded-md ${deviceConnectionContext?.isDeviceConnected ? "bg-lime-400" : "bg-gray-300"} mt-4 w-full px-6 items-center py-3`}
              disabled={!deviceConnectionContext?.isDeviceConnected}
              onPress={startTestRoutine}
            >
              <Text className={`text-lg text-white font-semibold`}>
                Test now
              </Text>
            </Pressable>
            <Pressable
              className={`rounded-md bg-lime-400 mt-4 w-full px-6 items-center py-3`}
              onPress={() => router.push("/manual")}
            >
              <Text className={`text-lg text-white font-semibold`}>
                Enter manually
              </Text>
            </Pressable>
          </View>
        )}
        {activeTab === 1 && (
          <>
            <Text className="text-left w-full mb-3">Your history</Text>
            {historyLoading && <ActivityIndicator />}
            <View className="flex flex-col w-full gap-3 flex-1 mb-10">
              {previousTests.map((test, i) => {
                const docIdDate = new Timestamp(
                  test.createdAt.seconds,
                  test.createdAt.nanoseconds,
                ).toDate();
                return (
                  <Pressable
                    key={i}
                    onPress={() => {
                      router.push(`/history/${test.id}` as Href);
                    }}
                    className="w-full p-4 flex flex-row justify-between border border-blue-400 rounded-lg"
                  >
                    <Text className="text-blue-500 font-medium text-lg">
                      {toLocaleDate(docIdDate)}
                    </Text>
                    <AntDesign name="right" size={24} color="blue" />
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
