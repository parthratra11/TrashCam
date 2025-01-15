"use client";

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { db } from "../../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
    paddingTop: 0,
  },
  zoneHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007ACC",
    marginBottom: 10,
    marginTop: 20,
  },
  leaderboardCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  stats: {
    fontSize: 14,
    color: "#666",
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginRight: 12,
  },
});

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);

        const zoneData = {};
        usersSnapshot.forEach((doc) => {
          const user = doc.data();
          const zone = user.analytics.zone;
          if (!zoneData[zone]) zoneData[zone] = [];
          zoneData[zone].push(user);
        });

        setLeaderboardData(
          Object.entries(zoneData).map(([zone, users]) => ({
            zone,
            users: users.sort(
              (a, b) => b.analytics.rating - a.analytics.rating
            ), // Sort by rating descending
          }))
        );
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const renderUserCard = ({ item, index }) => (
    <View style={styles.leaderboardCard}>
      <View style={styles.cardRow}>
        <Text style={styles.rankText}>#{index + 1}</Text>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.stats}>Rating: {item.analytics.rating}/5</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.stats}>
          False Reports: {item.analytics.false_reports}
        </Text>
        <Text style={styles.stats}>Penalties: {item.analytics.penalties}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <Text className="p-5 font-semibold text-3xl justify-center text-center border-b-hairline">
        Leaderboard
      </Text>
      <ScrollView style={styles.container}>
        {leaderboardData.map(({ zone, users }) => (
          <View key={zone}>
            <Text style={styles.zoneHeader}>{zone} Zone</Text>
            <FlatList
              data={users}
              renderItem={(props) => renderUserCard(props)}
              keyExtractor={(item) => item.userId}
            />
          </View>
        ))}
      </ScrollView>
      <Text
        className="absolute top-0 right-0 text-right mx-4 my-4 p-1 px-3 font-semibold text-3xl rounded-full border"
        onPress={() => {
          router.replace("profile");
        }}
      >
        x
      </Text>
    </View>
  );
}
