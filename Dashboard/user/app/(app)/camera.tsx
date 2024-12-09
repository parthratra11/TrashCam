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
import * as Location from "expo-location";
import { router } from "expo-router";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // AWS SDK for S3
import * as FileSystem from "expo-file-system";
import "react-native-get-random-values"; // Required for UUID and crypto support
import { Buffer } from "buffer";

import { BUCKET_NAME, REGION, ACCESS_KEY, SECRET_KEY, USERNAME } from "@env";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null
  );

  // Configure S3 client
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    },
  });

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

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ quality: 0.5 });

      try {
        // Get current location
        let locationData = null;
        if (locationPermission) {
          try {
            locationData = await Location.getCurrentPositionAsync({});
          } catch (locationError) {
            console.log("Could not get location:", locationError);
          }
        }

        // Convert image to binary
        const fileBase64 = await FileSystem.readAsStringAsync(photo.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const fileBinary = Buffer.from(fileBase64, "base64");

        const fileKey = `users/${new Date().toISOString()}.jpg`;

        const uploadParams = {
          Bucket: BUCKET_NAME,
          Key: fileKey,
          Body: fileBinary,
          Metadata: {
            username: USERNAME,
            timestamp: new Date().toISOString(),
            lat: locationData ? String(locationData.coords.latitude) : "NA",
            lon: locationData ? String(locationData.coords.longitude) : "NA",
            // Location: locationData
            //   ? `Lat: ${locationData.coords.latitude}, Lon: ${locationData.coords.longitude}`
            //   : "Not available",
          },
          ContentType: "image/jpeg",
        };

        const command = new PutObjectCommand(uploadParams);
        try {
          const response = await s3Client.send(command);
          if (response.$response.httpResponse.statusCode === 200) {
            Alert.alert(
              "Upload Success",
              "Image uploaded to AWS S3 successfully."
            );
          } else {
            console.log("Upload response error:", response);
            Alert.alert("Upload Error", "Unexpected response from AWS S3.");
          }
        } catch (error) {
          // console.error("Error uploading image:", error);
          // Alert.alert("Upload Failed", "Could not upload image to AWS S3.");
          console.log(error);
        }

        Alert.alert("Upload Success", "Image uploaded to AWS S3 successfully.");
      } catch (error) {
        // console.error("Error uploading image:", error);
        // Alert.alert("Upload Failed", "Could not upload image to AWS S3.");
        console.log(error);
      }

      router.replace("home");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CameraView style={{ flex: 1 }} facing={facing} ref={setCamera}>
        <View className="flex-row flex-1 justify-center items-end pb-12">
          <TouchableOpacity
            className="text-center bg-emerald-600 py-4 px-6 rounded-2xl"
            onPress={takePicture}
          >
            <Text className="font-bold text-white text-xl">Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
