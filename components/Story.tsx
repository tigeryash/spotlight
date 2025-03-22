import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "@/app/styles/feed.styles";

type Story = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
};

const Story = ({ story }: { story: Story }) => {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  );
};

export default Story;
