import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/feed.styles";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { COLORS } from "@/constants/colors";
import Story from "@/components/Story";
import Post from "@/components/Post";
import Loader from "@/components/Loader";

const index = () => {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) return <Loader />;

  if (posts.length === 0) return <NoPostsFound />;
  return (
    <View className="flex-1  p-4 bg-black">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {STORIES.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </ScrollView>
        {posts.map((post) => (
          <Post key={post._id} post={post} /> // Assuming Post is a component that takes a post prop
        ))}
      </ScrollView>
    </View>
  );
};

export default index;

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.background,
    }}
  >
    <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
  </View>
);
