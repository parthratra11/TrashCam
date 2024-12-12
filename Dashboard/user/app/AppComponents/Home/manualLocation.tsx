import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ManualLocation({
  manualInput,
  setManualInput,
  customCity,
  //   setCustomCity,
  onCityChange, // New prop to handle city change
}) {
  const handleManualSubmit = () => {
    const trimmedCity = customCity.trim();

    if (trimmedCity === "") {
      Alert.alert("Validation Error", "Please enter a valid location.");
      return;
    }

    // Use the onCityChange prop if provided, otherwise do nothing
    if (onCityChange) {
      onCityChange(trimmedCity);
    }

    setManualInput(false);
    // setCustomCity("");
    customCity = "";
  };

  if (!manualInput) return null;

  return (
    <View style={styles.manualInputContainer}>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={customCity}
        onChangeText={(value) => (customCity.current = value)}
        returnKeyType="done"
        onSubmitEditing={handleManualSubmit}
      />
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: "#10b981" }]} // Tailwind's emerald-600 equivalent
        onPress={handleManualSubmit}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
      <Text>No location detected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  manualInputContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: hp(2),
    color: "black",
  },
  submitButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "bold",
  },
});
