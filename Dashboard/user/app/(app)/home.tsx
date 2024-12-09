import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import UrbanEco from "@/assets/images/urbanEco.png";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { router } from "expo-router";
import Logout from "../AppComponents/Home/logout";
import PastReports from "../AppComponents/Home/pastReports";
import LocationDropdown from "../AppComponents/Home/locationDropdown";
import Notifications from "../AppComponents/Home/notifications";
import UserGreeting from "../AppComponents/Home/userGreeting";
import ManualLocation from "../AppComponents/Home/manualLocation";

//! IMPLEMENT GUEST LOGIN TOO

export default function Home() {
  const { logout, user } = useAuth();
  const [manualInput, setManualInput] = useState(false);
  const [customCity, setCustomCity] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  const takePicture = () => {
    router.replace("camera");
  };

  console.log("userData: ", user);
  return (
    <ScrollView className="flex-1 bg-white px-5 py-2">
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        {/* Logo */}
        <Image source={UrbanEco} style={{ width: wp(40), height: hp(7) }} />

        {/* Logout Button */}
        <Logout handleLogout={handleLogout} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15,
          marginHorizontal: 5,
        }}
      >
        {/* Location */}
        <LocationDropdown
          manualInput={manualInput}
          setManualInput={setManualInput}
          customCity={customCity}
          setCustomCity={setCustomCity}
        />

        {/* Notifications */}
        <Notifications />
      </View>

      {/* TODO: Manual Location Input */}
      {/* TODO: Use reference instead of state */}
      <ManualLocation
        manualInput={manualInput}
        setManualInput={setManualInput}
        customCity={customCity}
        setCustomCity={setCustomCity}
      />

      {/* User Greeting */}
      <UserGreeting user={user} />

      {/* Camera Redirect */}
      <View className="mt-5 items-center">
        <TouchableOpacity
          className="bg-red-600 px-5 py-5 rounded-full"
          onPress={takePicture}
        >
          <MaterialIcons name="camera-alt" size={hp(15)} color="white" />
        </TouchableOpacity>
      </View>

      <PastReports />
    </ScrollView>
  );
}
