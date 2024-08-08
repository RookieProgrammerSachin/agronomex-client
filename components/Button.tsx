import { View, Text, Pressable, PressableProps } from "react-native";
import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type ButtonPropsType = Partial<{
  disabled: boolean;
  fullWidth: boolean;
  onPress: PressableProps["onPress"];
  className: string;
  bgActive: string;
  bgDisabled: string;
  children: React.ReactNode | string;
}>;

export default function Button({
  disabled = false,
  fullWidth = true,
  onPress = () => null,
  bgActive = "bg-lime-400",
  bgDisabled = "bg-gray-300",
  className,
  children,
}: ButtonPropsType) {
  return (
    <Pressable
      className={cn(
        `rounded-md ${!disabled ? bgActive : bgDisabled} mt-4 ${fullWidth ? "w-full" : "w-unset"} px-6 items-center py-3`,
        className,
      )}
      onPress={onPress}
    >
      {typeof children === "string" ? (
        <Text className={`text-lg text-white font-semibold`}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
