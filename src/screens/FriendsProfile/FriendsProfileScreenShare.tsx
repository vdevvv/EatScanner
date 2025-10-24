// src/screens/FriendsProfileScreenShare.tsx
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

// Демо-зображення
const AVATAR_SOURCE =
  require("../../assets/profile-avatar.jpg") as ImageSourcePropType;
const FRIEND_1_SOURCE =
  require("../../assets/friend1.jpg") as ImageSourcePropType;
const FRIEND_2_SOURCE =
  require("../../assets/friend2.jpg") as ImageSourcePropType;
const FRIEND_3_SOURCE =
  require("../../assets/friend3.jpg") as ImageSourcePropType;
const FRIEND_4_SOURCE =
  require("../../assets/friend4.jpg") as ImageSourcePropType;

// Локальні іконки месенджерів
const TELEGRAM_ICON =
  require("../../assets/MessagesFriend.png") as ImageSourcePropType;
const WHATSAPP_ICON =
  require("../../assets/WhatsappIconFriend.png") as ImageSourcePropType;
const MESSENGER_ICON =
  require("../../assets/MessengerIconFriend.png") as ImageSourcePropType;
const MAIL_ICON = require("../../assets/MailFriend.png") as ImageSourcePropType;

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

const MUTUAL_FRIENDS = [
  {
    id: "1",
    name: "Hugo",
    avatar: FRIEND_1_SOURCE,
    messengerIcon: MESSENGER_ICON,
  },
  {
    id: "2",
    name: "Laura",
    avatar: FRIEND_2_SOURCE,
    messengerIcon: WHATSAPP_ICON,
  },
  {
    id: "3",
    name: "Anne",
    avatar: FRIEND_3_SOURCE,
    messengerIcon: TELEGRAM_ICON,
  },
  {
    id: "4",
    name: "Jasper",
    avatar: FRIEND_4_SOURCE,
    messengerIcon: TELEGRAM_ICON,
  },
];

const SHARE_APPS = [
  { id: "2", label: "Mail", icon: MAIL_ICON, isLocalIcon: true },
  { id: "3", label: "Messenger", icon: MESSENGER_ICON, isLocalIcon: true },
  { id: "4", label: "Whatsapp", icon: WHATSAPP_ICON, isLocalIcon: true },
  { id: "5", label: "Telegram", icon: TELEGRAM_ICON, isLocalIcon: true },
];

const EXTRA_ACTIONS = [
  { id: "1", label: "Copy", icon: "copy-outline" },
  { id: "2", label: "Add to readinglist", icon: "book-outline" },
];

const FriendsProfileScreenShare: React.FC = () => {
  const navigation = useNavigation();
  const [shareVisible, setShareVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(height));

  const handleBack = () => navigation.goBack();

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

  // Open share modal on mount
  useEffect(() => {
    openShareModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StatItem = ({ count, label }: { count: number; label: string }) => (
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderShareAppIcon = (app: any) => {
    if (app.isLocalIcon) {
      return (
        <Image
          source={app.icon}
          style={styles.localAppIcon}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Ionicons name={app.icon as any} size={40} color={COLORS.textDark} />
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{USER_DATA.handle}</Text>
        <TouchableOpacity onPress={openShareModal}>
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

        {/* Friends section */}
        <View style={styles.mutualSection}>
          <Text style={styles.mutualCount}>{USER_DATA.mutualFriendsCount}</Text>
          <Text style={styles.mutualLabel}>Mutual Friends</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MUTUAL_FRIENDS.map((f) => (
              <View key={f.id} style={styles.friendItem}>
                <Image source={f.avatar} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{f.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Share Modal */}
      <Modal visible={shareVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeShareModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.shareModal,
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
            contentContainerStyle={styles.shareFriendsRow}
          >
            {MUTUAL_FRIENDS.map((f) => (
              <View key={f.id} style={styles.shareFriend}>
                <View style={styles.shareAvatarContainer}>
                  <Image source={f.avatar} style={styles.shareFriendAvatar} />
                  <View style={styles.shareMessengerIconContainer}>
                    <Image
                      source={f.messengerIcon}
                      style={styles.shareMessengerIcon}
                    />
                  </View>
                </View>
                <Text style={styles.shareFriendName}>{f.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.divider} />

          <View style={styles.shareAppsRow}>
            {SHARE_APPS.map((a) => (
              <View key={a.id} style={styles.shareAppItem}>
                {renderShareAppIcon(a)}
                <Text style={styles.appLabel}>{a.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.extraActions}>
            {EXTRA_ACTIONS.map((act) => (
              <TouchableOpacity key={act.id} style={styles.extraActionItem}>
                <Text style={styles.extraActionText}>{act.label}</Text>
                <Ionicons
                  name={act.icon as any}
                  size={24}
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

export default FriendsProfileScreenShare;

// --------------------------------------------------
// STYLES
const PADDING_HORIZONTAL = 20;
const AVATAR_SIZE = 80;
const FRIEND_SIZE = 58;

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
  statLabel: { fontSize: 12, color: COLORS.textGrey },
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

  mutualSection: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 16,
  },
  mutualCount: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  mutualLabel: { fontSize: 12, color: COLORS.textGrey, marginBottom: 10 },
  friendItem: { alignItems: "center", marginRight: 14 },
  avatarContainer: {
    position: "relative",
  },
  friendAvatar: {
    width: FRIEND_SIZE,
    height: FRIEND_SIZE,
    borderRadius: FRIEND_SIZE / 2,
    marginBottom: 4,
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
  friendName: { fontSize: 11, color: COLORS.textGrey },

  // Bottom modal
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  shareModal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  shareHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  shareAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  shareName: { fontSize: 16, fontWeight: "600", color: COLORS.textDark },
  shareHandle: { fontSize: 14, color: COLORS.textGrey },

  shareFriendsRow: { paddingVertical: 10 },
  shareFriend: { alignItems: "center", marginRight: 16 },
  shareAvatarContainer: {
    position: "relative",
  },
  shareFriendAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 4,
  },
  shareMessengerIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  shareMessengerIcon: {
    width: 14,
    height: 14,
  },
  shareFriendName: { fontSize: 12, color: COLORS.textDark },

  divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: 8 },

  shareAppsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  shareAppItem: {
    alignItems: "center",
    marginBottom: 8,
  },
  localAppIcon: {
    width: 40,
    height: 40,
  },
  appLabel: { fontSize: 12, color: COLORS.textDark },

  extraActions: {
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: 6,
  },
  extraActionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    alignItems: "center",
  },
  extraActionText: { fontSize: 15, color: COLORS.textDark },
});
