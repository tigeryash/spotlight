import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/app/styles/feed.styles";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const Post = ({ post }: { post: any }) => {
  return (
    <View style={styles.post}>
      {/* post header */}
      <View>
        <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        {/* todo fix later */}
        {/* <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity> */}

        <TouchableOpacity>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* image */}
      <Image
        source={post.author.image}
        style={styles.postAvatar}
        contentFit="cover"
        transition={200}
        cachePolicy={"memory-disk"}
      />

      {/* post actions */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* post info */}

      <View style={styles.postInfo}>
        <Text style={styles.likesText}>Be the first to like</Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.useername}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        <TouchableOpacity>
          <Text style={styles.commentsText}>View all 2 comments</Text>
        </TouchableOpacity>

        <Text style={styles.timeAgo}>2 hours ago</Text>
      </View>
    </View>
  );
};

export default Post;
