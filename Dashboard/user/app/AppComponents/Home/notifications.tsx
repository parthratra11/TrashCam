import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Notification data based on past reports
const getNotifications = () => [
  {
    id: "1",
    time: "16:15",
    date: "04 Sep, 2024",
    location: "Kamla Nagar, Delhi",
    status: "pending",
    reportType: "Environmental Survey",
    details: "Your report for Kamla Nagar is pending review.",
  },
  {
    id: "2",
    time: "15:00",
    date: "02 Sep, 2024",
    location: "Rajouri Garden, Delhi",
    status: "pending",
    reportType: "Urban Waste Management",
    details:
      "Your report for Rajouri Garden requires additional investigation.",
  },
  {
    id: "3",
    time: "13:45",
    date: "31 Aug, 2024",
    location: "Tilak Nagar, Delhi",
    status: "completed",
    reportType: "Water Quality Assessment",
    details: "Your report for Tilak Nagar has been successfully processed.",
  },
  {
    id: "4",
    time: "12:30",
    date: "29 Aug, 2024",
    location: "Kamla Nagar, Delhi",
    status: "completed",
    reportType: "Air Quality Monitoring",
    details: "Your report for Kamla Nagar has been reviewed and approved.",
  },
  {
    id: "5",
    time: "10:45",
    date: "25 Aug, 2024",
    location: "Tilak Nagar, Delhi",
    status: "pending",
    reportType: "Infrastructure Assessment",
    details: "Your report for Tilak Nagar is under preliminary review.",
  },
];

// Status color and icon mapping
const statusConfig = {
  pending: {
    color: "#C70039",
    icon: (size) => <Octicons name="circle" size={size} color="#C70039" />,
    textColor: "#C70039",
  },
  completed: {
    color: "green",
    icon: (size) => <AntDesign name="checkcircle" size={size} color="green" />,
    textColor: "green",
  },
};

export default function Notifications() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(getNotifications());

  // Clear all notifications
  const clearAllNotifications = () => {
    Alert.alert(
      "Clear Notifications",
      "Are you sure you want to clear all notifications?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationHeader}>
        <Text style={styles.timeText}>{item.time}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{item.location}</Text>
          <View style={styles.statusIconContainer}>
            {statusConfig[item.status].icon(hp(2.7))}
          </View>
        </View>
        <Text style={styles.detailsText}>{item.details}</Text>
        <View style={styles.statusBadge}>
          <Text
            style={[
              styles.statusText,
              { color: statusConfig[item.status].textColor },
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.bellIcon}
      >
        <MaterialCommunityIcons name="bell" size={hp(3)} color="black" />
        {notifications.length > 0 && (
          <View style={styles.notificationCountBadge}>
            <Text style={styles.notificationCountText}>
              {notifications.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderText}>Notifications</Text>
                  <View style={styles.headerActions}>
                    {notifications.length > 0 && (
                      <TouchableOpacity
                        onPress={clearAllNotifications}
                        style={styles.clearButton}
                      >
                        <Feather name="trash-2" size={20} color="red" />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>

                <FlatList
                  data={notifications}
                  renderItem={renderNotificationItem}
                  keyExtractor={(item) => item.id}
                  ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No notifications</Text>
                    </View>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bellIcon: {
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    padding: 8,
    position: "relative",
  },
  notificationCountBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: hp(70),
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  clearButton: {
    padding: 5,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationItem: {
    backgroundColor: "#f0f4f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeText: {
    color: "gray",
    fontSize: 14,
  },
  dateText: {
    color: "gray",
    fontSize: 14,
  },
  notificationContent: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  statusIconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  detailsText: {
    color: "#4B5563",
    marginBottom: 10,
    fontSize: 14,
  },
  statusBadge: {
    alignSelf: "flex-start",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    color: "gray",
    fontSize: 16,
  },
});
