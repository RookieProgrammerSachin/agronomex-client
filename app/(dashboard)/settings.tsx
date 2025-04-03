import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import { DashboardLayout } from "@/components/layout";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { useTailwind } from "nativewind";
import useAuth from "@/hooks/useAuth";

type SettingsSectionType = {
  Icon: React.ReactNode;
  sectionTitle: string;
  links: {
    name: string;
    href: Href<string | object>;
  }[];
};

function SettingsSection({ Icon, sectionTitle, links }: SettingsSectionType) {
  return (
    <View className="gap-y-3 w-full my-5">
      <View className="w-full items-center flex-row justify-start gap-x-4">
        {Icon}
        <Text className="text-lg text-lime-500 font-bold">{sectionTitle}</Text>
      </View>

      {links.map((link, i) => (
        <Link key={i + 31} className="text-lg font-normal" href={link.href}>
          {link.name}
        </Link>
      ))}
    </View>
  );
}

export default function settings() {
  const { logout, user } = useAuth();
  const tw = useTailwind({
    className: "bg-lime-500",
  });

  // @ts-ignore
  const limeColor = tw[0]?.backgroundColor;

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <DashboardLayout>
        {/* Agronomex logo */}
        <View className="w-full items-center py-4">
          <Image
            source={require("@/assets/images/logo.png")}
            resizeMode={"contain"}
            style={{
              display: "flex",
              width: 150,
            }}
          />
        </View>

        <View className="flex flex-row items-center justify-start w-full gap-x-4">
          <Image
            source={require("@/assets/images/user.png")}
            resizeMode="contain"
          />
          <Text className="text-bold text-lg">
            {user?.displayName || user?.email || "Farmer"}
          </Text>
        </View>

        <View className="px-6 gap-y-6 flex w-full">
          <Text className="text-xl text-lime-500 font-bold">Settings</Text>
          {/* Account section */}
          <SettingsSection
            Icon={
              <MaterialIcons
                name="manage-accounts"
                color={limeColor}
                size={30}
              />
            }
            sectionTitle="Account"
            links={[
              {
                name: "Edit profile",
                href: "/home",
              },
              {
                name: "Change password",
                href: "/home",
              },
              {
                name: "Privacy policy",
                href: "/home",
              },
            ]}
          />
          <SettingsSection
            Icon={
              <MaterialIcons
                name="circle-notifications"
                color={limeColor}
                size={30}
              />
            }
            sectionTitle="Notifications"
            links={[
              {
                name: "Notifications",
                href: "/home",
              },
              {
                name: "Updates",
                href: "/home",
              },
            ]}
          />
          <SettingsSection
            Icon={<MaterialIcons name="settings" color={limeColor} size={30} />}
            sectionTitle="Preferences"
            links={[
              {
                name: "Region",
                href: "/home",
              },
              {
                name: "Language",
                href: "/home",
              },
            ]}
          />

          {/* Logout button */}
          <Pressable
            onPress={logout}
            className="bg-red-500 py-3 rounded-md w-full mt-5"
          >
            <Text className="text-white text-center font-bold text-lg">
              Logout
            </Text>
          </Pressable>
        </View>
      </DashboardLayout>
    </ScrollView>
  );
}
