// src/screens/UserProfileScreen.tsx
import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");

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

// Іконки месенджерів
const MESSENGER_ICON =
  require("../../assets/MessengerIconFriend.png") as ImageSourcePropType;
const WHATSAPP_ICON =
  require("../../assets/WhatsappIconFriend.png") as ImageSourcePropType;
const MESSAGES_ICON =
  require("../../assets/MessagesFriend.png") as ImageSourcePropType;

// Demo Data
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
  {
    id: "m1",
    avatar: FRIEND_1_SOURCE,
    name: "Max",
    messengerIcon: MESSENGER_ICON,
  },
  {
    id: "m2",
    avatar: FRIEND_2_SOURCE,
    name: "Anna",
    messengerIcon: WHATSAPP_ICON,
  },
  {
    id: "m3",
    avatar: FRIEND_3_SOURCE,
    name: "Tom",
    messengerIcon: MESSAGES_ICON,
  },
  {
    id: "m4",
    avatar: FRIEND_4_SOURCE,
    name: "Ira",
    messengerIcon: MESSAGES_ICON,
  },
];

const MENU_OPTIONS = [
  "Share Profile",
  "Add to the Group",
  "Remove Friend",
  "Block User",
  "Report",
];

const SHARE_OPTIONS = [
  { id: "1", label: "Message", icon: "chatbubble-outline" },
  { id: "2", label: "Mail", icon: "mail-outline" },
  { id: "3", label: "Messenger", icon: "logo-messenger" },
  { id: "4", label: "Whatsapp", icon: "logo-whatsapp" },
];

const BOTTOM_ACTIONS = [
  { id: "1", label: "Copy", icon: "copy-outline" },
  { id: "2", label: "Add to reading list", icon: "book-outline" },
];

// Типи для навігації
type RootStackParamList = {
  HomePageScreen: undefined;
  FriendsProfileScreen: undefined;
  FriendsProfileScreenShare: undefined;
  ChatsScreen: undefined;
  MyProfileScreen: undefined;
  BlockUserScreen: undefined;
  FriendsReportUser: undefined;
  RemoveFriend: undefined;
  FriendAlertBlockUser: undefined;
};

type UserProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FriendsProfileScreen"
>;

// --------------------------------------------------
const UserProfileScreen: React.FC = () => {
  const navigation = useNavigation<UserProfileNavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(height));

  const handleBack = () => navigation.goBack();

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

  const openShareModal = () => {
    setShareVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeShareModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShareVisible(false));
  };

  const handleMenuOption = (option: string) => {
    toggleMenu();

    switch (option) {
      case "Share Profile":
        setTimeout(() => {
          navigation.navigate("FriendsProfileScreenShare");
        }, 300);
        break;
      case "Add to the Group":
        navigation.navigate("ChatsScreen");
        break;
      case "Remove Friend":
        // Логіка видалення друга

        setTimeout(() => {
          navigation.navigate("RemoveFriend");
        }, 300);
        break;
      case "Block User":
        setTimeout(() => {
          navigation.navigate("FriendAlertBlockUser");
        }, 300); // 2 секунди
        break;
      case "Report":
        setTimeout(() => {
          navigation.navigate("FriendsReportUser");
        }, 300);
        break;
      default:
        break;
    }
  };

  // -----------------------------------
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
        <TouchableOpacity onPress={handleBack}>
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
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() => navigation.navigate("ChatsScreen")}
          >
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
                <View style={styles.avatarContainer}>
                  <Image source={f.avatar} style={styles.friendAvatar} />
                </View>
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
              onPress={() => handleMenuOption(option)}
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

      {/* Bottom Share Modal */}
      <Modal visible={shareVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeShareModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.shareSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.shareHeader}>
            <Image source={USER_DATA.avatar} style={styles.shareAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.shareName}>{USER_DATA.name}</Text>
              <Text style={styles.shareHandle}>{USER_DATA.handle}</Text>
            </View>
            <TouchableOpacity onPress={closeShareModal}>
              <Ionicons name="close" size={22} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shareFriendsScroll}
          >
            {MUTUAL_FRIENDS.map((f) => (
              <View key={f.id} style={styles.shareFriendItem}>
                <Image source={f.avatar} style={styles.shareFriendAvatar} />
                <Text style={styles.shareFriendName}>{f.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.shareDivider} />

          <View style={styles.shareIconsRow}>
            {SHARE_OPTIONS.map((o) => (
              <TouchableOpacity
                key={o.id}
                style={styles.shareIconBlock}
                onPress={() => {
                  closeShareModal();
                  if (o.label === "Message") {
                    navigation.navigate("ChatsScreen");
                  }
                  // Інші опції можна додати пізніше
                }}
              >
                <View style={styles.shareIconCircle}>
                  <Ionicons
                    name={o.icon as any}
                    size={22}
                    color={COLORS.textDark}
                  />
                </View>
                <Text style={styles.shareIconLabel}>{o.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomActions}>
            {BOTTOM_ACTIONS.map((a) => (
              <TouchableOpacity key={a.id} style={styles.actionRow}>
                <Text style={styles.actionLabel}>{a.label}</Text>
                <Ionicons
                  name={a.icon as any}
                  size={18}
                  color={COLORS.textDark}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

// --------------------------------------------------
// СТИЛІ
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
  avatarContainer: {
    position: "relative",
  },
  friendAvatar: {
    width: FRIEND_AVATAR_SIZE,
    height: FRIEND_AVATAR_SIZE,
    borderRadius: FRIEND_AVATAR_SIZE / 2,
  },
  messengerIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  messengerIcon: {
    width: 16,
    height: 16,
  },
  friendName: { fontSize: 11, color: COLORS.textGrey, textAlign: "center" },

  pastOrdersHeader: { paddingVertical: 12, alignItems: "center" },
  pastOrdersTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },
  orderItemContainer: { width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE * 1.5 },
  orderImage: { flex: 1, justifyContent: "flex-end" },
  orderTextOverlay: { padding: 8, backgroundColor: "rgba(0,0,0,0.35)" },
  orderDishName: { fontSize: 12, fontWeight: "600", color: COLORS.white },
  orderRestaurantName: { fontSize: 10, color: COLORS.white },

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
    minWidth: 220,
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
  menuText: { fontSize: 16, color: COLORS.textDark, fontWeight: "500" },

  // Share Modal
  shareSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  shareHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  shareAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  shareName: { fontSize: 16, fontWeight: "600", color: COLORS.textDark },
  shareHandle: { fontSize: 14, color: COLORS.textGrey },
  shareFriendsScroll: { paddingVertical: 10 },
  shareFriendItem: { alignItems: "center", marginRight: 18 },
  shareFriendAvatar: { width: 54, height: 54, borderRadius: 27 },
  shareFriendName: { fontSize: 12, color: COLORS.textDark },
  shareDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 8,
  },
  shareIconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  shareIconBlock: { alignItems: "center" },
  shareIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  shareIconLabel: { fontSize: 12, color: COLORS.textDark },
  bottomActions: {
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: 6,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  actionLabel: { fontSize: 15, color: COLORS.textDark },
});
