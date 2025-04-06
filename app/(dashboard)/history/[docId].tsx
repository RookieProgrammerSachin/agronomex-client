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
          rowGap: 6,
        }}
        className=" w-full"
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

            {data.nutrients && (
              <ScrollView className="mt-2 flex-1">
                <Text className="text-xl font-semibold mb-2">
                  Soil Nutrients:
                </Text>
                {Object.entries(data.nutrients).map(([nutrient, quantity]) => (
                  <View
                    key={nutrient}
                    className="border flex-col flex gap-y-2 mb-4 border-green-500/50 rounded-md p-3"
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="text-lg text-green-700 font-medium">
                        {nutrient}
                      </Text>
                      <Text className="text-lg">{quantity}</Text>
                    </View>
                    {data.cropWanted &&
                      data.suggestions?.nutrient_suggestions &&
                      data.suggestions.nutrient_suggestions.length > 0 && (
                        <View className="flex-col">
                          <Text className="font-semibold">Suggestions:</Text>
                          {(() => {
                            const sugg =
                              data.suggestions.nutrient_suggestions.find(
                                (item) => (item.nutrient = nutrient),
                              );
                            if (sugg) {
                              return (
                                <View className="flex-row p-1">
                                  <Text className="flex-1">
                                    {sugg.suggestion}
                                  </Text>
                                </View>
                              );
                            } else return "";
                          })()}
                        </View>
                      )}
                  </View>
                ))}
              </ScrollView>
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
