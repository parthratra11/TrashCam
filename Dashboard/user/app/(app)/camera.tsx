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
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as FileSystem from "expo-file-system";
import "react-native-get-random-values";
import { Buffer } from "buffer";

import { BUCKET_NAME, REGION, ACCESS_KEY, SECRET_KEY } from "@env";

import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

export default function CameraScreen() {
  const { user } = useAuth();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null
  );
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [uploading, setUploading] = useState(false);

  // console.log(user);

  // S3 CLIENT CONFIG
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    },
  });

  // DATETIME
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // CAMERA AND LOCATION ACCESS
  useEffect(() => {
    (async () => {
      if (permission === undefined) await requestPermission();

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

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // const takePicture = async () => {
  //   if (camera) {
  //     const photo = await camera.takePictureAsync({ quality: 0.5 });
  //     () => {
  //       setUploading(true);
  //     };

  //     try {
  //       // CURRENT LOCATION
  //       let locationData = null;
  //       if (locationPermission) {
  //         try {
  //           locationData = await Location.getCurrentPositionAsync({});
  //         } catch (locationError) {
  //           console.log("Could not get location:", locationError);
  //         }
  //       }

  //       router.replace("home");

  //       // IMG TO BINARY CONVERSION
  //       const fileBase64 = await FileSystem.readAsStringAsync(photo.uri, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });
  //       const fileBinary = Buffer.from(fileBase64, "base64");

  //       const fileKey = `users/${currentDateTime
  //         .toLocaleString()
  //         .replace(", ", "-")
  //         .replaceAll("/", ":")}.jpg`;

  //       // UPLOAD PARAMETERS FOR AWS BUCKET
  //       const uploadParams = {
  //         Bucket: BUCKET_NAME,
  //         Key: fileKey,
  //         Body: fileBinary,
  //         Metadata: {
  //           type: "user",
  //           username: String(user?.userId || "Unknown"),
  //           timestamp: currentDateTime.toLocaleString().replace(", ", "-"),
  //           lat: locationData ? String(locationData.coords.latitude) : "NA",
  //           lon: locationData ? String(locationData.coords.longitude) : "NA",
  //           status: String(false),
  //           locality: "",
  //           ContentType: "image/jpeg",
  //         },
  //       };

  //       const command = new PutObjectCommand(uploadParams);
  //       try {
  //         const response = await s3Client.send(command);
  //         if (response.$response.httpResponse.statusCode === 200) {
  //           Alert.alert("Upload Success", "Image uploaded for verification.");
  //         } else {
  //           console.log("Upload response error:", response);
  //           Alert.alert("Upload Error", "Unexpected response from AWS S3.");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }

  //       Alert.alert("Upload Success", "Image uploaded for verification.");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ quality: 0.5 });
      setUploading(true);

      try {
        // CURRENT LOCATION
        let locationData = null;
        let detectedCity = "Unknown";

        if (locationPermission) {
          try {
            locationData = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = locationData.coords;

            // GETTING CITY FROM COORDINATES
            const [location] = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });

            detectedCity =
              location.city ||
              location.district ||
              location.subregion ||
              location.country ||
              "Unknown";
          } catch (locationError) {
            console.log("Could not get location:", locationError);

            Alert.alert("Location Error", "Unable to detect location.");
            setUploading(false);
            router.replace("/home");
            return;
          }
        }

        router.replace("home");

        // IMG TO BINARY CONVERSION
        const fileBase64 = await FileSystem.readAsStringAsync(photo.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const fileBinary = Buffer.from(fileBase64, "base64");

        const fileKey = `users/${currentDateTime
          .toLocaleString()
          .replace(", ", "-")
          .replaceAll("/", ":")}.jpg`;

        // UPLOAD PARAMETERS FOR AWS BUCKET
        const uploadParams = {
          Bucket: BUCKET_NAME,
          Key: fileKey,
          Body: fileBinary,
          Metadata: {
            type: "user",
            username: String(user?.userId || "Unknown"),
            timestamp: currentDateTime.toLocaleString().replace(", ", "-"),
            lat: locationData ? String(locationData.coords.latitude) : "NA",
            lon: locationData ? String(locationData.coords.longitude) : "NA",
            status: String(false),
            locality: detectedCity, // SETTING LOCALITY HERE
            ContentType: "image/jpeg",
          },
        };

        const command = new PutObjectCommand(uploadParams);

        try {
          const response = await s3Client.send(command);
          // console.log(response.$response.httpResponse.statusCode);

          if (response.$response.httpResponse.statusCode === 200) {
            Alert.alert("Upload Success", "Image uploaded for verification.");
          } else {
            console.log("Upload response error:", response);
            Alert.alert("Upload Error", "Unexpected response from AWS S3.");
            return;
          }
        } catch (error) {
          console.log(error);
        }

        Alert.alert("Upload Success", "Image uploaded for verification.");
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    }
  };

  // FORMATTING DATETIME
  const formattedDateTime = currentDateTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {/* DATETIME */}
      <View className="absolute top-10 left-0 right-0 z-10 items-center">
        <Text className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded">
          {formattedDateTime}
        </Text>
      </View>

      <CameraView style={{ flex: 1 }} facing={facing} ref={setCamera}>
        <View className="flex-row flex-1 justify-center items-end pb-12">
          {/* CLICK PICTURE */}
          <TouchableOpacity
            className="text-center bg-emerald-700 py-6 px-6 rounded-full mr-4"
            onPress={takePicture}
          >
            {/* <Text className="font-bold text-white text-xl">Take Picture</Text> */}
            <Ionicons name="camera" size={28} color="white" />
          </TouchableOpacity>

          {/* CAMERA FLIP */}
          {/* <TouchableOpacity
            className="bg-white/30 p-4 rounded-full flex items-center justify-center"
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse-sharp" size={28} color="white" />
          </TouchableOpacity> */}
        </View>
      </CameraView>
    </View>
  );
}
