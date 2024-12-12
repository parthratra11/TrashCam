"use client";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#007ACC",
  },
  buttonPrimary: {
    backgroundColor: "#007ACC",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#E8EEF2",
    borderWidth: 1,
    borderColor: "#007ACC",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#007ACC",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function Profile() {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [socialRating, setSocialRating] = useState(0);
  const [awards, setAwards] = useState("");

  useEffect(() => {
    const userData = async () => {
      const docRef = doc(db, "users", user.userId, "analytics");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();
        setSocialRating(data.rating);
        setAwards(data.badge);
      }
    };
    userData();
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={require("../../assets/images/user_profile.jpg")}
          style={styles.image}
        />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Total Reports:</Text>{" "}
          {user.analytics.total_reports ? user.analytics.total_reports : 0}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Social Rating:</Text>{" "}
          {user.analytics.rating}/5
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Penalties:</Text>{" "}
          {user.analytics.penalties}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Badge: </Text>
          <Text>{user.analytics.badge}</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => router.replace("home")}
      >
        <Text style={styles.buttonPrimaryText}>Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.replace("leaderboard")}
      >
        <Text style={styles.buttonSecondaryText}>View Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonPrimary}
        // onPress={() => router.replace("contact-support")}
      >
        <Text style={styles.buttonPrimaryText}>Contact Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecondary} onPress={logout}>
        <Text style={styles.buttonSecondaryText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
