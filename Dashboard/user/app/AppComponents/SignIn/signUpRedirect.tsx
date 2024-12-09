import { View, Text, Pressable } from "react-native";
import React from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

export default function SignUpRedirect({ router }) {
  return (
    <View className="flex-row justify-center " style={{ width: wp(90) }}>
      <Text
        style={{ fontSize: hp(1.8) }}
        className="font-bold text-neutral-500"
      >
        Don't have an account?
      </Text>
      <Pressable onPress={() => router.push("signUp")}>
        <Text
          style={{ fontSize: hp(1.8) }}
          className="font-bold text-indigo-500 pl-1"
        >
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}
