import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const router = useRouter();
  const { user } = useUser();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  console.log("selectedImage", selectedImage);

  if (!selectedImage) {
    return (
      <View className="flex-1 bg-background">
        <View className="flex-row flex items-center justify-between px-4 py-3 border-b=[.5px] border-b-surface">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text className="text-lg text-white" style={{ fontWeight: 600 }}>
            New Post
          </Text>
          <View className="w-7" />
        </View>

        <TouchableOpacity
          onPress={() => pickImage()}
          className="flex-1 justify-center items-center gap-4"
        >
          <Ionicons name="image-outline" size={48} color={COLORS.grey} />
          <Text className="text-grey text-lg">Tap to select an image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View className="flex-1">
        <View className="flex-row flex items-center justify-between px-4 py-3 border-b=[.5px] border-b-surface">
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(null);
              setCaption("");
            }}
            disabled={isSharing}
          >
            <Ionicons
              name="close-outline"
              size={28}
              color={isSharing ? COLORS.grey : COLORS.white}
            />
          </TouchableOpacity>
          <Text className="text-lg text-white" style={{ fontWeight: 600 }}>
            New Post
          </Text>
          <TouchableOpacity
            className={`px-3 py-2 items-center justify-center`}
            style={{ minWidth: 60, opacity: isSharing ? 0.5 : 1 }}
            disabled={isSharing || !selectedImage}
            // onPress={handleShare}
          >
            {isSharing ? (
              <ActivityIndicator size={"small"} color={COLORS.primary} />
            ) : (
              <Text className="text-lg text-white" style={{ fontWeight: 600 }}>
                Share
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Create;
