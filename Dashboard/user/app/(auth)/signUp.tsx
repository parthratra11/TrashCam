import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";

import React, { useRef, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { StatusBar } from "expo-status-bar";
import { Feather, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "@/components/loading";
import CustomKeyboardView from "@/components/customKeyboardView";
import { useAuth } from "@/context/authContext";
import UsernameInput from "../AppComponents/SignUp/usernameInput";
import EmailInput from "../AppComponents/SignUp/emailInput";
import PasswordInput from "../AppComponents/SignUp/passwordInput";
import Submit from "../AppComponents/SignUp/submit";
import SignInRedirect from "../AppComponents/SignUp/signInRedirect";

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  // const profileRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current
      // !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }
    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current
      // profileRef.current
    );
    setLoading(false);

    console.log("response: ", response);

    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
      return;
    }
    router.push("home");
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        className="flex-1 gap-10"
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            style={{ height: hp(20), width: wp(50) }}
            resizeMode="contain"
            source={require("../../assets/images/urbanEco.png")}
          ></Image>
        </View>
        <View className="gap-4">
          <Text
            className="text-center font-bold tracking-wider text-neutral-800"
            style={{ fontSize: hp(3) }}
          >
            Sign Up
          </Text>

          <View className="gap-3">
            {/* USERNAME INPUT */}
            <UsernameInput usernameRef={usernameRef} />
            {/* EMAIL INPUT */}
            <EmailInput emailRef={emailRef} />

            {/* PASSWORD INPUT */}
            <PasswordInput passwordRef={passwordRef} />

            {/* PROFILE INPUT */}
            {/* <View className="flex-row gap-4 px-4 py-2 bg-neutral-100 items-center rounded-xl">
              <Feather name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                className="flex-1 font-semibold text-neutral-700"
                style={{ fontSize: hp(2) }}
                placeholder="Profile URL"
                placeholderTextColor={"gray"}
              ></TextInput>
            </View> */}

            {/* SUBMIT BUTTON */}
            <Submit handleRegister={handleRegister} loading={loading} />

            {/* SIGN UP REDIRECT */}
            <SignInRedirect router={router} />
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
