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
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "@/components/loading";
import { useAuth } from "@/context/authContext";
import EmailInput from "../AppComponents/SignIn/emailInput";
import PasswordInput from "../AppComponents/SignIn/passwordInput";
import ForgotPassword from "../AppComponents/SignIn/forgotPassword";
import Submit from "../AppComponents/SignIn/submit";
import SignUpRedirect from "../AppComponents/SignIn/signUpRedirect";

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };

  return (
    <View className="flex-1">
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
            Sign In
          </Text>

          <View className="gap-3">
            {/* EMAIL INPUT */}
            <EmailInput emailRef={emailRef} />

            {/* PASSWORD INPUT */}
            <View className="gap-2">
              <PasswordInput passwordRef={passwordRef} />
              {/* FORGOT PASSWORD */}
              <ForgotPassword />
            </View>

            {/* SUBMIT BUTTON */}
            <Submit handleLogin={handleLogin} loading={loading} />

            {/* SIGN UP REDIRECT */}
            <SignUpRedirect router={router} />
          </View>
        </View>
      </View>
    </View>
  );
}
