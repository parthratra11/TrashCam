import { View, Text } from "react-native";
import React from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function UserGreeting({ user }) {
  return (
    <View className="mt-4">
      <Text className="text-xl font-bold text-gray-700">
        Hello, {user ? user.username : "Guest"}
      </Text>
      <Text className="mt-.5 text-base text-gray-400">Welcome to UrbanEco</Text>
    </View>
  );
}
