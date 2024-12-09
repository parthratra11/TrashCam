import React, { useState, useEffect } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native"; // For navigation

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null); // to reference the camera
  const navigation = useNavigation(); // for navigation

  // Request camera permission
  useEffect(() => {
    if (permission === undefined) requestPermission();
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center pb-10">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  // Function to toggle the camera (front/back)
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Function to take picture
  const takePicture = async () => {
    if (camera) {
      // Take a picture and save it
      const photo = await camera.takePictureAsync({ quality: 0.5 });

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      try {
        await MediaLibrary.createAlbumAsync("Clicks", asset);
        alert("Photo saved to album!");
        router.replace("home");
      } catch (error) {
        console.log("Error creating album:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        ref={setCamera} // Set camera reference
      >
        <Pressable
          className="absolute top-0 right-0 m-4 bg-black rounded-full"
          onPress={() => {
            router.replace("home");
          }}
        >
          <MaterialIcons name="cancel" size={26} color="white" />
        </Pressable>
        <View className="flex-row flex-1 justify-center items-end pb-12">
          <TouchableOpacity
            className="text-center bg-emerald-600 py-4 px-6 rounded-2xl"
            onPress={() => {
              takePicture();
            }}
          >
            <Text className="font-bold text-white text-xl">Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-4 bg-red-500 p-4 rounded-full"
            onPress={() => {
              toggleCameraFacing();
            }}
          >
            <Ionicons name="camera-reverse-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
