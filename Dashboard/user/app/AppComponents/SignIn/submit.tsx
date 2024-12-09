import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "@/components/loading";

export default function Submit({ handleLogin, loading }) {
  return (
    <View>
      {loading ? (
        <View className="flex-row justify-center">
          <Loading size={hp(6.5)} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-emerald-600 rounded-xl justify-center items-center"
          style={{ height: hp(6.7) }}
        >
          <Text
            className="text-white font-bold tracking-wider text-center"
            style={{ fontSize: hp(2.7) }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
