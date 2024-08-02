import { Link, Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Index() {
  /** Temporary useEffect to redirect to /home becahse expo restartsr entire app if changes made
   * and its annoying to navigate to that page over and over manually
   */

  // Even this is throwing new error
  // useEffect(() => {
  //   router.push("/home")
  // }, [])
  return <Redirect href={"/home"} />

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      <Image source={require("@/assets/images/logo.png")} />
      <Link href={"/login"}>
        <Text>Login to your account</Text>
      </Link>
    </View>
  );
}
