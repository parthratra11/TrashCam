import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
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
import UserProfile from "../AppComponents/Home/userProfile";

export default function Home() {
  const { logout, user } = useAuth();
  const [manualInput, setManualInput] = useState(false);
  // const [customCity, setCustomCity] = useState("");.
  const customCity = useRef("");

  const handleLogout = async () => {
    await logout();
  };

  const takePicture = () => {
    router.replace("camera");
  };

  // console.log("userData: ", user);
  return (
    <ScrollView className="flex-1 bg-white px-5 py-2">
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
        className="border-b-hairline pb-2"
      >
        {/* LOGO */}
        <Image source={UrbanEco} style={{ width: wp(40), height: hp(7) }} />
        <View className="flex-row justify-center items-center">
          {/* LOGOUT BUTTON */}
          <Logout handleLogout={handleLogout} />

          {/* USER PROFILE */}
          <UserProfile />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 2,
        }}
        // className="border-b-hairline pb-2"
      >
        {/* LOCATION */}
        <LocationDropdown
          manualInput={manualInput}
          setManualInput={setManualInput}
          customCity={customCity}
          // setCustomCity={setCustomCity}
        />

        {/* NOTIFICATIONS */}
        <Notifications />
      </View>

      {/* TODO: Manual Location Input */}
      {/* <ManualLocation
        manualInput={manualInput}
        setManualInput={setManualInput}
        customCity={customCity}
        // setCustomCity={setCustomCity}
      /> */}

      {/* USER GREETING */}
      <UserGreeting user={user} />

      {/* CAMERA REDIRECT */}
      <View className="mt-10 items-center">
        <TouchableOpacity
          className="bg-red-600 p-8 rounded-full"
          onPress={takePicture}
        >
          <MaterialIcons name="camera-alt" size={hp(10)} color="white" />
        </TouchableOpacity>
      </View>

      <PastReports />
    </ScrollView>
  );
}
