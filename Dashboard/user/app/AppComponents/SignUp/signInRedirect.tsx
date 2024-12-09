import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { View, Text, Pressable } from "react-native";
import React from "react";

export default function SignInRedirect({ router }) {
  return (
    <View className="flex-row justify-center " style={{ width: wp(90) }}>
      <Text
        style={{ fontSize: hp(1.8) }}
        className="font-bold text-neutral-500"
      >
        Already have an account?
      </Text>
      <Pressable onPress={() => router.push("signIn")}>
        <Text
          style={{ fontSize: hp(1.8) }}
          className="font-bold text-indigo-500 pl-1"
        >
          Sign In
        </Text>
      </Pressable>
    </View>
  );
}
