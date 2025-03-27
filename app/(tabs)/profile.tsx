import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import Loader from "@/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/profile.styles";
import { Image } from "expo-image";
import { COLORS } from "@/constants/colors";

const Profile = () => {
  const { signOut, userId } = useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const currentUser = useQuery(
    api.users.getUserByClerkId,
    userId ? { clerkId: userId } : "skip"
  );

  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname || "",
    bio: currentUser?.bio || "",
  });
  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
  const posts = useQuery(api.posts.getPostByUser, {});

  const updateProfile = useMutation(api.users.updateProfile);

  const handleSaveProfile = async () => {};

  if (!currentUser || posts === undefined) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>{currentUser.username}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => signOut()}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarAndStats}>
            <View style={styles.avatarContainer}>
              <Image
                source={currentUser.image}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <Text style={styles.name}>{currentUser.fullname}</Text>
          {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditModalVisible(true)}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {posts.length === 0 && <NoPostsFound />}

        <FlatList
          data={posts}
          numColumns={3}
          scrollEnabled={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedPost(item)}>
              <Image
                source={item.imageUrl}
                style={styles.gridImage}
                contentFit="cover"
                transition={200}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Profile;

const NoPostsFound = () => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.background,
    }}
  >
    <Ionicons name="image-outline" size={48} color={COLORS.primary} />
    <Text style={styles.noPostsText}>No posts yet</Text>
  </View>
);
