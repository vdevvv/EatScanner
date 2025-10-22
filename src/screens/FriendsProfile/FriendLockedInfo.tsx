import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  Modal,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  background: "#FFFFFF",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  divider: "#E5E7EB",
  overlay: "rgba(0,0,0,0.5)",
  white: "#FFFFFF",
};

// Локальні картинки
const AVATAR = require("../../assets/profile-avatar.jpg");
const DISH_1 = require("../../assets/sushi-dragons.jpg");
const DISH_2 = require("../../assets/potatoes-square.jpg");
const FRIEND_1 = require("../../assets/friend1.jpg");
const FRIEND_2 = require("../../assets/friend2.jpg");
const FRIEND_3 = require("../../assets/friend3.jpg");
const FRIEND_4 = require("../../assets/friend4.jpg");

const USER = {
  handle: "@foodie_iryna",
  name: "Talia Gomez",
  stats: [
    { label: "Saved", count: 46 },
    { label: "Friends", count: 212 },
  ],
  mutualFriends: [
    { id: "1", image: FRIEND_1 },
    { id: "2", image: FRIEND_2 },
    { id: "3", image: FRIEND_3 },
    { id: "4", image: FRIEND_4 },
  ],
};

const PAST_ORDERS = [
  { id: "1", image: DISH_1, title: "Sushi Dragons", restaurant: "Chefs Hall" },
  {
    id: "2",
    image: DISH_2,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
  { id: "3", image: DISH_1, title: "Sushi Dragons", restaurant: "Chefs Hall" },
  {
    id: "4",
    image: DISH_2,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
  { id: "5", image: DISH_1, title: "Sushi Dragons", restaurant: "Chefs Hall" },
  {
    id: "6",
    image: DISH_2,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
];

const UserProfileLockedScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);

  const renderOrder = ({ item }: any) => (
    <ImageBackground
      source={item.image}
      style={styles.orderImage}
      resizeMode="cover"
    >
      <View style={styles.orderOverlay}>
        <Text style={styles.orderTitle}>{item.title}</Text>
        <Text style={styles.orderRestaurant}>{item.restaurant}</Text>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{USER.handle}</Text>
        <Ionicons
          name="ellipsis-horizontal"
          size={24}
          color={COLORS.textDark}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Profile info */}
        <View style={styles.profileSection}>
          <View style={styles.row}>
            <Image source={AVATAR} style={styles.avatar} />
            <View style={styles.stats}>
              {USER.stats.map((item, i) => (
                <View key={i} style={styles.statItem}>
                  <Text style={styles.statCount}>{item.count}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.name}>{USER.name}</Text>

          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageText}>Send message</Text>
          </TouchableOpacity>
        </View>

        {/* Mutual Friends */}
        <View style={styles.mutualSection}>
          <Text style={styles.mutualCount}>40</Text>
          <Text style={styles.mutualLabel}>Mutual Friends</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {USER.mutualFriends.map((f) => (
              <Image key={f.id} source={f.image} style={styles.friendAvatar} />
            ))}
          </ScrollView>
        </View>

        {/* Past Orders */}
        <View style={styles.ordersHeader}>
          <Text style={styles.ordersTitle}>Past Orders</Text>
        </View>
        <FlatList
          data={PAST_ORDERS}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          numColumns={3}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalBox}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={22} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>You Can’t See This Yet</Text>
          <Text style={styles.modalText}>
            Send a friend request to unlock saved videos and more profile info.
          </Text>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Friend</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.laterButton}
          >
            <Text style={styles.laterText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserProfileLockedScreen;

const GRID_ITEM_SIZE = width / 3;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },

  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 16 },
  stats: { flexDirection: "row", flex: 1, justifyContent: "space-around" },
  statItem: { alignItems: "center" },
  statCount: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  statLabel: { fontSize: 12, color: COLORS.textGrey },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  messageButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  messageText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },

  mutualSection: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    padding: 16,
  },
  mutualCount: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  mutualLabel: { fontSize: 12, color: COLORS.textGrey, marginBottom: 8 },
  friendAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 10,
  },

  ordersHeader: { alignItems: "center", paddingVertical: 14 },
  ordersTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },

  orderImage: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.5,
    justifyContent: "flex-end",
  },
  orderOverlay: { backgroundColor: "rgba(0,0,0,0.35)", padding: 8 },
  orderTitle: { fontSize: 12, fontWeight: "600", color: COLORS.white },
  orderRestaurant: { fontSize: 10, color: COLORS.white },

  // MODAL
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  modalBox: {
    position: "absolute",
    top: "35%",
    alignSelf: "center",
    width: "85%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  closeButton: { position: "absolute", top: 12, right: 12 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    marginTop: 8,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.textGrey,
    textAlign: "center",
    marginVertical: 12,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  addButtonText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  laterButton: { marginTop: 12 },
  laterText: { color: COLORS.textGrey, fontSize: 15 },
});
