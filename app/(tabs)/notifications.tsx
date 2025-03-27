import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "@/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { styles } from "../styles/notifications.styles";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { formatDistanceToNow } from "date-fns";
import { Id } from "@/convex/_generated/dataModel";

const Notifications = () => {
  const notifications = useQuery(api.notifications.getNotifications);

  if (notifications === undefined) return <Loader />;
  if (notifications.length === 0) return <NoNotificationsFound />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Notifications;

type NotificationItemProps = {
  notification: {
    sender: {
      image: string;
      username: string;
      _id: Id<"users">;
    };
    type: "like" | "follow" | "comment";
    comment?: string | undefined;
    _creationTime: number;
    post: {
      _id: Id<"posts">;
      imageUrl: string;
      caption?: string;
      likes: number;
      comments: number;
      _creationTime: number;
      isLiked?: boolean;
      isBookmarked?: boolean;
      author?: {
        _id: string;
        username: string;
        image: string;
      };
    } | null;
  };
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link
          // @ts-ignore
          href={`/user/${notification.sender._id}`}
          asChild
        >
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification.type === "like" ? (
                <Ionicons name="heart" size={14} color={COLORS.primary} />
              ) : notification.type === "follow" ? (
                <Ionicons name="person-add" size={14} color={"#8b5cf6"} />
              ) : (
                <Ionicons name="chatbubble" size={14} color={"#3B82f6"} />
              )}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.notificationInfo}>
          <Link // @ts-ignore
            href={`/user/${notification.sender._id}`}
            asChild
          >
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.action}>
            {notification.type === "follow"
              ? "started following you"
              : notification.type === "like"
                ? "liked your post"
                : `commented: "${notification.comment}"`}
          </Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const NoNotificationsFound = () => {
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons name="notifications-outline" size={48} color={COLORS.primary} />
      <Text style={{ fontSize: 20, color: COLORS.white }}>
        No notifications yet
      </Text>
    </View>
  );
};
