import { router } from "expo-router";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center bg-green-900">
      <Text className="text-gray-300">Loading...</Text>
      <ActivityIndicator size="large" color="grey" />
    </View>
  );
};

export default StartPage;
