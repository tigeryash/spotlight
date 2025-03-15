import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const index = () => {
  const { signOut } = useAuth();
  return (
    <View className="flex-1  p-4 bg-black">
      <TouchableOpacity onPress={() => signOut()}>
        <Text className="text-white">Signout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
