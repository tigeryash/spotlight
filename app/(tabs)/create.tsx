import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
// import { Image } from "expo-image";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { styles } from "../styles/create.styles";

const { width } = Dimensions.get("window");

const Create = () => {
  const router = useRouter();
  const { user } = useUser();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);

  const handleShare = async () => {
    if (!selectedImage) return;

    try {
      setIsSharing(true);
      const uploadUrl = await generateUploadUrl(); //this generates a url to upload the file to

      const uploadResult = await FileSystem.uploadAsync(
        //upload aync requires a url to upload the file to, and the file to upload, and the options for the upload
        uploadUrl,
        selectedImage,
        {
          httpMethod: "POST", //post method is used to upload the file
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT, //this means we are uploading a binary file
          mimeType: selectedImage.endsWith(".png")
            ? "image/png"
            : selectedImage.endsWith(".jpg") || selectedImage.endsWith(".jpeg")
              ? "image/jpeg"
              : selectedImage.endsWith(".heic")
                ? "image/heic"
                : "image/webp", //mimetype is the type of file we are uploading
        }
      );

      if (uploadResult.status !== 200) throw new Error("Upload failed");

      const { storageId } = JSON.parse(uploadResult.body);
      await createPost({ storageId, caption });

      setSelectedImage(null); //clear the selected image after uploading
      setCaption(""); //clear the caption after uploading

      router.push("/(tabs)");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSharing(false); //set is sharing to false when the upload is done
    }
  };

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
          onPress={pickImage}
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
        {/* Header */}
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
            onPress={handleShare}
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

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
          }}
          bounces={false}
          contentOffset={{
            x: 0,
            y: 100,
          }}
        >
          <View className="flex-1">
            {/* image section */}
            <View
              style={{
                width: width,
                height: width,
                opacity: isSharing ? 0.7 : 1,
              }}
              className="bg-surface justify-center items-center"
            >
              <Image
                source={{ uri: selectedImage }}
                // contentFit="cover"
                // transition={200}
                resizeMode="cover"
                className="w-full h-full"
              />
              <TouchableOpacity
                style={{ backgroundColor: "rgba(0,0,0,.75)" }}
                onPress={pickImage}
                disabled={isSharing}
                className="absolute bottom-4 right-4 flex-row p-2 rounded-md items-center"
              >
                <Ionicons name="image-outline" size={20} color={COLORS.white} />
                <Text
                  style={{ fontWeight: 500 }}
                  className="text-base text-white"
                >
                  Change{" "}
                </Text>
              </TouchableOpacity>
            </View>

            {/* input section */}
            <View style={styles.inputSection}>
              <View style={styles.captionContainer}>
                <Image
                  source={{ uri: user?.imageUrl }}
                  style={styles.userAvatar}
                  resizeMode="cover"
                  // contentFit="cover"
                  // transition={200}
                />
                <TextInput
                  style={styles.captionInput}
                  placeholder="Write a cpation..."
                  multiline
                  value={caption}
                  onChangeText={setCaption}
                  editable={!isSharing}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Create;
