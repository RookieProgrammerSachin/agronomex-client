import Header from "@/components/Header";
import { DashboardLayout } from "@/components/layout";
import useAuth from "@/hooks/useAuth";
import { toLocaleDate } from "@/utils/date";
import { db } from "@/utils/firebaseConfig";
import { TestType } from "@/utils/types";
import { useGlobalSearchParams } from "expo-router";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";

type NutrientCardType = {
  nutrientName: string;
  qty: string;
};

function NutrientCard({ nutrientName, qty }: NutrientCardType) {
  return (
    <View className="w-[92vw] flex-row rounded-lg border border-blue-400/50 p-1">
      <View className="w-full ml-5">
        <Text className="text-blue-400 font-semibold text-lg">
          {nutrientName}
        </Text>
        <Text className="text-blue-400">{qty}</Text>
      </View>
    </View>
  );
}

export default function History() {
  const params = useGlobalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [data, setData] = useState<TestType | null>(null);

  useEffect(() => {
    getData();

    async function getData() {
      try {
        const data = await getDoc(
          doc(db, "soil-test", user!.uid, "reports", params.docId as string),
        );
        console.log(JSON.stringify(data.data()));
        if (!data.exists()) {
          return Alert.alert("No data found for this test!");
        }
        setData(data.data() as TestType);
      } catch (error) {
        console.log("🚀 ~ firebase fetch ~ error:", error);
        Alert.alert("Something went wrong when fetching your data!");
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const title = useMemo(() => {
    if (data && data.createdAt) {
      const date = new Timestamp(
        data.createdAt.seconds,
        data.createdAt.nanoseconds,
      ).toDate();
      return toLocaleDate(date);
    }
    return null;
  }, [data]);

  return (
    <DashboardLayout>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          rowGap: 12,
        }}
      >
        {isLoading && !data ? (
          <ActivityIndicator size="large" />
        ) : data ? (
          <>
            {/* Title of the test */}
            <Text className="text-2xl font-semibold text-center mt-4">
              Result for {title}
            </Text>
            {data.cropWanted && (
              <>
                <Text>Crop to grow:</Text>
                <Text className="text-3xl text-green-700 font-semibold text-center">
                  {data.cropWanted}
                </Text>
              </>
            )}
          </>
        ) : (
          <Text className="text-3xl font-bold text-center mt-4">
            Data not found!
          </Text>
        )}
      </ScrollView>
    </DashboardLayout>
  );
}
