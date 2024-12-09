import { View, Text } from "react-native";
import React from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ForgotPassword() {
  return (
    <View>
      <Text
        style={{ fontSize: hp(1.8) }}
        className="font-semibold text-right text-neutral-500"
      >
        Forgot password?
      </Text>
    </View>
  );
}
