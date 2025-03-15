import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";
import { StatusBar } from "react-native";
import InitialLayout from "@/components/InitialLayout";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
    // Add more fonts as needed
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView className="flex-1 " style={{ backgroundColor: "black" }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}
