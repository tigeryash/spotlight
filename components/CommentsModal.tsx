import { View, Text } from "react-native";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type CommentsModalProps = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
};

const CommentsModal = ({
  onClose,
  onCommentAdded,
  postId,
  visible,
}: CommentsModalProps) => {
  const [newComment, setNewComment] = useState<string>("");
  const comments = useQuery(api.comments.getComments, { postId });
  const addComment = useMutation(api.comments.addComment);
  return (
    <View>
      <Text>CommentsModal</Text>
    </View>
  );
};

export default CommentsModal;
