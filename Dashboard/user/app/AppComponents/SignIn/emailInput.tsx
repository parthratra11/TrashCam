import { View, Text, TextInput } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function EmailInput({ emailRef }) {
  return (
    <View className="flex-row gap-4 px-4 py-2 bg-neutral-100 items-center rounded-xl">
      <Octicons name="mail" size={hp(2.7)} color="gray" />
      <TextInput
        onChangeText={(value) => (emailRef.current = value)}
        className="flex-1 font-semibold text-neutral-700"
        style={{ fontSize: hp(2) }}
        placeholder="Email Address"
        placeholderTextColor={"gray"}
      ></TextInput>
    </View>
  );
}
