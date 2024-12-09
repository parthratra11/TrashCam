import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { View, Text, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

export default function UsernameInput({ usernameRef }) {
  return (
    <View className="flex-row gap-4 px-4 py-2 bg-neutral-100 items-center rounded-xl">
      <Feather name="user" size={hp(2.7)} color="gray" />
      <TextInput
        onChangeText={(value) => (usernameRef.current = value)}
        className="flex-1 font-semibold text-neutral-700"
        style={{ fontSize: hp(2) }}
        placeholder="Username"
        placeholderTextColor={"gray"}
      ></TextInput>
    </View>
  );
}
