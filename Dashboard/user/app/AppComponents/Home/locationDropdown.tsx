import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { AntDesign, Octicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function LocationDropdown({
  manualInput,
  setManualInput,
  customCity,
  setCustomCity,
}) {
  const [currentCity, setCurrentCity] = useState("Select Location");
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
  ]);

  const fetchLocation = async () => {
    try {
      //   LOCATION PERMISSIONS
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // MANUAL INPUT INCASE LOCATION PERMISSION NOT ALLOWED
        setManualInput(true);
        setCurrentCity("Location Access Denied");
        setLoading(false);
        return;
      }

      //   CURRENT LOCATION
      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      //   CITY FROM GEOCODE
      const [location] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // PRIORITY ORDER: CITY > DISTRICT > COUNTRY
      const detectedCity =
        location.city ||
        location.district ||
        location.subregion ||
        location.country ||
        "Unknown Location";

      // UPDATE CITY AND SET LOADING TO FALSE
      setCurrentCity(detectedCity);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location:", error);

      //   INCASE OF ERRORS
      Alert.alert(
        "Location Error",
        "Unable to automatically detect location. Please enter manually."
      );

      setManualInput(true);
      setCurrentCity("Select Location");
      //   IN CASE OF ERROR
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const toggleManualInput = () => {
    setManualInput(!manualInput);
    setCustomCity("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationRow}>
        <AntDesign name="enviroment" size={28} color="black" />
        {loading ? (
          <ActivityIndicator
            size="small"
            color="black"
            style={styles.loadingIndicator}
          />
        ) : manualInput ? (
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={customCity}
            onChangeText={setCustomCity}
          />
        ) : (
          <Text style={styles.currentCityText}>{currentCity}</Text>
        )}
        {!manualInput && (
          <SelectDropdown
            data={
              currentCity && !cities.includes(currentCity)
                ? [currentCity, ...cities]
                : cities
            }
            defaultButtonText="Select Location"
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownButtonText}
            onSelect={(selectedItem) => setCurrentCity(selectedItem)}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            renderDropdownIcon={() => (
              <Octicons name="chevron-down" size={hp(2.5)} color="gray" />
            )}
          />
        )}
        {/* TODO: Manual location input */}
        {/* <TouchableOpacity onPress={toggleManualInput} style={styles.editButton}>
          <AntDesign
            name={manualInput ? "close" : "edit"}
            size={20}
            color="gray"
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: 2,
  },
  loadingIndicator: {
    marginHorizontal: 5,
  },
  dropdownButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    borderRadius: 5,
    height: hp(4.5),
  },
  dropdownButtonText: {
    fontSize: hp(2),
    color: "black",
    textAlign: "left",
  },
  editButton: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
    fontSize: hp(2),
    color: "black",
  },
});
