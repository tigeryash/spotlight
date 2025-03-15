import { View, Text, TouchableOpacity } from "react-native";
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

  if (!selectedImage) {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text>New Post</Text>
          <View className="w-7" />
        </View>

        <TouchableOpacity onPress={() => pickImage()}>
          <Ionicons name="image-outline" size={48} color={COLORS.grey} />
          <Text>Tap to select an image</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default Create;
