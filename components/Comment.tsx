import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { formatDistanceToNow } from "date-fns";
import { styles } from "@/app/styles/feed.styles";

type Comment = {
  content: string;
  _creationTime: number;
  user: {
    fullname: string;
    image: string;
  };
};
const Comment = ({ comment }: { comment: Comment }) => {
  return (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: comment.user.image }}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{comment.user.fullname}</Text>
        <Text style={styles.commentText}>{comment.content}</Text>
        <Text style={styles.commentTime}>
          {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
