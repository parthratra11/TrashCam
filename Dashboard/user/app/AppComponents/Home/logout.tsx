import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Logout({ handleLogout }) {
  return (
    <View>
      <TouchableOpacity
        style={{
          // backgroundColor: "green",
          paddingVertical: 5,
          // paddingHorizontal: 20,
          borderRadius: 20,
          marginBottom: 4,
          width: wp(20),
        }}
        className="bg-emerald-600"
        onPress={handleLogout}
      >
        <Text
          style={{ color: "white", fontSize: hp(2) }}
          className="text-center"
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
