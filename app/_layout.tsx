import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";
import { Platform } from "react-native";
import InitialLayout from "@/components/InitialLayout";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

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

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000000");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <SafeAreaView className="flex-1 " style={{ backgroundColor: "black" }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar style="light" />
    </ClerkAndConvexProvider>
  );
}
