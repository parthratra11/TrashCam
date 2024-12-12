import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function UserProfile() {
  return (
    <View>
      <Feather
        name="user"
        size={24}
        color="black"
        className="rounded-full border-2 border-gray-400 p-2"
        onPress={() => {
          router.replace("profile");
        }}
      />
    </View>
  );
}
