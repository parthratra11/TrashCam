import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { View, Text, TextInput } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

export default function PasswordInput({ passwordRef }) {
  return (
    <View className="flex-row gap-4 px-4 py-2 bg-neutral-100 items-center rounded-xl">
      <Octicons name="lock" size={hp(2.7)} color="gray" />
      <TextInput
        onChangeText={(value) => (passwordRef.current = value)}
        className="flex-1 font-semibold text-neutral-700"
        style={{ fontSize: hp(2) }}
        placeholder="Password"
        placeholderTextColor={"gray"}
        secureTextEntry
      ></TextInput>
    </View>
  );
}
