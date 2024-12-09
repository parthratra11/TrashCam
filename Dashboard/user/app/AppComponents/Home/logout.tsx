import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Logout({ handleLogout }) {
  // Function to handle logout confirmation
  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout", // Title of the alert
      "Are you sure you want to log out?", // Message
      [
        {
          text: "Cancel",
          style: "cancel", // Style for the cancel button
        },
        {
          text: "Yes",
          onPress: handleLogout, // Call the logout function
        },
      ],
      { cancelable: true } // Allows dismissing the alert by tapping outside
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          borderRadius: 20,
          marginBottom: 4,
          width: wp(20),
        }}
        className="bg-emerald-600"
        onPress={confirmLogout} // Use confirmLogout instead of handleLogout
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
