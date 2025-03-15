import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Login = () => {
  const { width, height } = Dimensions.get("window");
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (e) {
      console.error("OAuth error:", e);
    }
  };
  return (
    <View className="flex-1 bg-background">
      <View
        className="mt-14"
        style={{
          alignItems: "center",
          height: height * 0.12,
        }}
      >
        <View
          className=" w-16 h-16 rounded-2xl flex justify-center items-center mb-3"
          style={{
            backgroundColor: "rgba(74, 222, 128, .15)",
          }}
        >
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text
          className="text-4xl text-primary"
          style={{
            fontWeight: "700",
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          spotlight
        </Text>
        <Text
          className="text-lg text-grey lowercase"
          style={{ letterSpacing: 1 }}
        >
          Don't miss anything
        </Text>
      </View>

      <View
        className="flex-1 items-center justify-center px-11 "
        style={{ alignItems: "center" }}
      >
        <Image
          source={require("../../assets/images/login-bg.png")}
          className="max-h-[355px]"
          resizeMode="cover"
          style={{
            width: width * 0.75,
            height: height * 0.75,
          }}
        />
      </View>

      <View className="w-full px-6 pb-10" style={{ alignItems: "center" }}>
        <TouchableOpacity
          className="flex flex-row items-center justify-center bg-white py-4 px-6 rounded-xl mb-5 w-full max-w-[300px]"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
          }}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View className="w-6 h-6 flex justify-center items-center mr-3">
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text className="text-lg text-surface" style={{ fontWeight: "600" }}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-sm text-grey max-w-[280px]">
          By continuing, you agree to our <Text>Terms of Service</Text> and{" "}
          <Text>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
