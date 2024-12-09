import React, { useState, useEffect } from "react";
import {
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location"; // Import location package
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null
  );
  const [camera, setCamera] = useState(null);
  const navigation = useNavigation();

  // Request camera and location permissions
  useEffect(() => {
    (async () => {
      if (permission === undefined) await requestPermission();

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
    })();
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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

  // Function to take picture and get location
  const takePicture = async () => {
    if (camera) {
      // Take a picture and save it
      const photo = await camera.takePictureAsync({ quality: 0.5 });

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(photo.uri);

      Alert.alert("Image Capture", "Image succesfully captured");

      try {
        await MediaLibrary.createAlbumAsync("Clicks", asset);

        // Get current location
        let locationData = null;
        if (locationPermission) {
          try {
            locationData = await Location.getCurrentPositionAsync({});
          } catch (locationError) {
            console.log("Could not get location:", locationError);
          }
        }

        // Construct metadata message
        const metadataMessage = `
          Filename: ${asset.filename}
          Creation Time: ${new Date().toString()}
          Location: ${
            locationData
              ? `Lat: ${locationData.coords.latitude}, Lon: ${locationData.coords.longitude}`
              : "Not available"
          }
          Dimensions: ${photo.width}x${photo.height}
        `;

        // Show metadata as alert
        Alert.alert("Image Metadata", metadataMessage, [{ text: "OK" }]);

        router.replace("home");
      } catch (error) {
        console.log("Error creating album or fetching metadata:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CameraView style={{ flex: 1 }} facing={facing} ref={setCamera}>
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
            onPress={takePicture}
          >
            <Text className="font-bold text-white text-xl">Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-4 bg-red-500 p-4 rounded-full"
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
