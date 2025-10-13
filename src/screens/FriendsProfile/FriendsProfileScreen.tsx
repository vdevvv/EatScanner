// src/screens/UserProfileScreen.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  ImageSourcePropType,
  ImageBackground,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  background: "#FFFFFF",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  white: "#FFFFFF",
  divider: "#E5E7EB",
  overlay: "rgba(0,0,0,0.4)",
};

// Локальні зображення
const AVATAR_SOURCE =
  require("../../assets/profile-avatar.jpg") as ImageSourcePropType;
const DISH_1_SOURCE =
  require("../../assets/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../../assets/potatoes-square.jpg") as ImageSourcePropType;
const FRIEND_1_SOURCE =
  require("../../assets/friend1.jpg") as ImageSourcePropType;
const FRIEND_2_SOURCE =
  require("../../assets/friend2.jpg") as ImageSourcePropType;
const FRIEND_3_SOURCE =
  require("../../assets/friend3.jpg") as ImageSourcePropType;
const FRIEND_4_SOURCE =
  require("../../assets/friend4.jpg") as ImageSourcePropType;

const USER_DATA = {
  handle: "@foodie_iryna",
  name: "Talia Gomez",
  stats: [
    { label: "Saved", count: 46 },
    { label: "Friends", count: 212 },
    { label: "Shared orders", count: 212 },
    { label: "Shared videos", count: 212 },
  ],
  mutualFriendsCount: 40,
  avatar: AVATAR_SOURCE,
};

const PAST_ORDERS_DATA = [
  {
    id: "1",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "2",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
];

const MUTUAL_FRIENDS = [
  { id: "m1", avatar: FRIEND_1_SOURCE, name: "Max" },
  { id: "m2", avatar: FRIEND_2_SOURCE, name: "Anna" },
  { id: "m3", avatar: FRIEND_3_SOURCE, name: "Tom" },
  { id: "m4", avatar: FRIEND_4_SOURCE, name: "Ira" },
];

// --------------------------------------------------
// 👇 Popup меню опції
const MENU_OPTIONS = [
  "Share Profile",
  "Add to the Group",
  "Remove Friend",
  "Block User",
  "Report",
];

// --------------------------------------------------
// Головний компонент
const UserProfileScreen: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  // -----------------------------------
  // Допоміжні компоненти
  const StatItem = ({ count, label }: { count: number; label: string }) => (
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const OrderItem = ({
    dishName,
    restaurant,
    image,
  }: {
    dishName: string;
    restaurant: string;
    image: ImageSourcePropType;
  }) => (
    <TouchableOpacity style={styles.orderItemContainer} activeOpacity={0.8}>
      <ImageBackground
        source={image}
        style={styles.orderImage}
        resizeMode="cover"
      >
        <View style={styles.orderTextOverlay}>
          <Text style={styles.orderDishName}>{dishName}</Text>
          <Text style={styles.orderRestaurantName}>{restaurant}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  // -----------------------------------
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back")}>
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{USER_DATA.handle}</Text>

        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile */}
        <View style={styles.profileBlock}>
          <View style={styles.topRow}>
            <Image source={USER_DATA.avatar} style={styles.avatar} />
            <View style={styles.statsContainer}>
              {USER_DATA.stats.map((s, i) => (
                <StatItem key={i} count={s.count} label={s.label} />
              ))}
            </View>
          </View>

          <Text style={styles.userName}>{USER_DATA.name}</Text>

          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Send message</Text>
          </TouchableOpacity>
        </View>

        {/* Mutual friends */}
        <View style={styles.mutualRow}>
          <View style={styles.mutualLeft}>
            <Text style={styles.mutualCount}>
              {USER_DATA.mutualFriendsCount}
            </Text>
            <Text style={styles.mutualLabel}>Mutual Friends</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsAvatarsScroll}
          >
            {MUTUAL_FRIENDS.map((f) => (
              <View key={f.id} style={styles.friendPill}>
                <Image source={f.avatar} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{f.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Past Orders */}
        <View style={styles.pastOrdersHeader}>
          <Text style={styles.pastOrdersTitle}>Past Orders</Text>
        </View>
        <FlatList
          data={PAST_ORDERS_DATA}
          renderItem={({ item }) => (
            <OrderItem
              dishName={item.dishName}
              restaurant={item.restaurant}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Popup Menu */}
      <Modal visible={menuVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.menuContainer,
            { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
          ]}
        >
          {MENU_OPTIONS.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                option === "Report" && {
                  borderTopWidth: 1,
                  borderColor: COLORS.divider,
                },
              ]}
              onPress={() => {
                console.log(option);
                toggleMenu();
              }}
            >
              <Text
                style={[
                  styles.menuText,
                  option === "Report" && { color: "#E53E3E" },
                ]}
              >
                {option}
              </Text>
              <Ionicons
                name="person-outline"
                size={18}
                color={option === "Report" ? "#E53E3E" : COLORS.textDark}
              />
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

// --------------------------------------------------
// Стилі
const PADDING_HORIZONTAL = 20;
const AVATAR_SIZE = 80;
const FRIEND_AVATAR_SIZE = 56;
const GRID_ITEM_SIZE = width / 3;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },

  profileBlock: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: { alignItems: "center", flex: 1 },
  statCount: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  statLabel: { fontSize: 12, color: COLORS.textGrey, textAlign: "center" },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  messageButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  messageButtonText: { fontSize: 16, fontWeight: "700", color: COLORS.white },

  mutualRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  mutualLeft: { width: 96, alignItems: "center" },
  mutualCount: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  mutualLabel: { fontSize: 12, color: COLORS.textGrey },
  friendsAvatarsScroll: { paddingLeft: 10, paddingRight: 20 },
  friendPill: { alignItems: "center", marginRight: 14 },
  friendAvatar: {
    width: FRIEND_AVATAR_SIZE,
    height: FRIEND_AVATAR_SIZE,
    borderRadius: FRIEND_AVATAR_SIZE / 2,
  },
  friendName: { fontSize: 11, color: COLORS.textGrey, textAlign: "center" },

  pastOrdersHeader: {
    paddingVertical: 12,
    alignItems: "center",
  },
  pastOrdersTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },
  orderItemContainer: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.5,
  },
  orderImage: { flex: 1, justifyContent: "flex-end" },
  orderTextOverlay: { padding: 8, backgroundColor: "rgba(0,0,0,0.35)" },
  orderDishName: { fontSize: 12, fontWeight: "600", color: COLORS.white },
  orderRestaurantName: { fontSize: 10, color: COLORS.white },

  // modal
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  menuContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: "500",
  },
});
