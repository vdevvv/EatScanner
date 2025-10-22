// screens/FriendsReportUser.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");

const COLORS = {
  background: "#FFFFFF",
  overlay: "rgba(0,0,0,0.5)",
  textDark: "#111827",
  textGrey: "#6B7280",
  accent: "#E9725C",
  border: "#E5E7EB",
  disabled: "#E5E7EB",
  white: "#FFFFFF",
};

const REPORT_REASONS = [
  "Spam",
  "Inappropriate content",
  "Harassment or bullying",
  "Fake profile",
  "Other",
];

const USER = {
  username: "@foodie_iryna",
  name: "Talia Gomez",
  avatar: require("../../assets/profile-avatar.jpg"),
};

// Demo data for stats and friends (align with other screens)
const USER_STATS = [
  { label: "Posts", count: 24 },
  { label: "Friends", count: 212 },
  { label: "Saved", count: 46 },
];

const FRIEND_1_SOURCE =
  require("../../assets/friend1.jpg") as ImageSourcePropType;
const FRIEND_2_SOURCE =
  require("../../assets/friend2.jpg") as ImageSourcePropType;
const FRIEND_3_SOURCE =
  require("../../assets/friend3.jpg") as ImageSourcePropType;
const FRIEND_4_SOURCE =
  require("../../assets/friend4.jpg") as ImageSourcePropType;

const MY_FRIENDS: { id: string; avatar: ImageSourcePropType; name: string }[] =
  [
    { id: "f1", avatar: FRIEND_1_SOURCE, name: "Max" },
    { id: "f2", avatar: FRIEND_2_SOURCE, name: "Anna" },
    { id: "f3", avatar: FRIEND_3_SOURCE, name: "Tom" },
    { id: "f4", avatar: FRIEND_4_SOURCE, name: "Ira" },
  ];

// Типи для навігації
type RootStackParamList = {
  SignUp: undefined;
  FriendsReportUser: undefined;
};

type FriendsReportNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FriendsReportUser"
>;

const FriendsReportUser: React.FC = () => {
  const navigation = useNavigation<FriendsReportNavigationProp>();
  const [reportVisible, setReportVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedReason) return;
    console.log(`Reported for: ${selectedReason}`);
    setReportVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image source={USER.avatar} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{USER.name}</Text>
            <Text style={styles.headerHandle}>{USER.username}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setReportVisible(true)}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      {/* PROFILE CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <Image source={USER.avatar} style={styles.avatar} />
            <View style={styles.statsContainer}>
              {USER_STATS.map((s) => (
                <View key={s.label} style={styles.statItem}>
                  <Text style={styles.statCount}>{s.count}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.name}>{USER.name}</Text>
          <Text style={styles.handle}>{USER.username}</Text>
        </View>

        {/* My Friends strip */}
        <View style={styles.friendsSection}>
          <Text style={styles.sectionTitle}>My Friends</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsRow}
          >
            {MY_FRIENDS.map((f) => (
              <View key={f.id} style={styles.friendPill}>
                <Image source={f.avatar} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{f.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Note text */}
        <View style={styles.noteBlock}>
          <Text style={styles.statusText}>
            You are viewing this user’s profile.
          </Text>
        </View>
      </ScrollView>

      {/* REPORT MODAL */}
      <Modal visible={reportVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            {/* Close icon */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setReportVisible(false)}
            >
              <Ionicons name="close" size={22} color="#374151" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Report This User?</Text>
            <Text style={styles.subtitle}>
              Choose a reason below. This won’t notify the user.
            </Text>

            {/* Dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              activeOpacity={0.8}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !selectedReason && { color: "#9CA3AF" },
                ]}
              >
                {selectedReason || "Select a reason"}
              </Text>
              <Ionicons
                name={dropdownOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color="#6B7280"
              />
            </TouchableOpacity>

            {/* Dropdown List */}
            {dropdownOpen && (
              <View style={styles.dropdownList}>
                <FlatList
                  data={REPORT_REASONS}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedReason(item);
                        setDropdownOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: selectedReason
                    ? COLORS.accent
                    : COLORS.disabled,
                },
              ]}
              disabled={!selectedReason}
              onPress={handleSubmit}
              activeOpacity={0.9}
            >
              <Text style={styles.submitText}>Submit Report</Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setReportVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FriendsReportUser;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  headerName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  headerHandle: {
    fontSize: 12,
    color: COLORS.textGrey,
  },

  profileCard: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 18,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: { alignItems: "center", flex: 1 },
  statCount: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  statLabel: { fontSize: 12, color: COLORS.textGrey, textAlign: "center" },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  handle: {
    fontSize: 14,
    color: COLORS.textGrey,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.textGrey,
  },
  friendsSection: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  friendsRow: { paddingRight: 18 },
  friendPill: { alignItems: "center", marginRight: 14 },
  friendAvatar: { width: 56, height: 56, borderRadius: 28, marginBottom: 6 },
  friendName: { fontSize: 11, color: COLORS.textGrey },
  noteBlock: { paddingHorizontal: 18, paddingVertical: 16 },

  // --- MODAL ---
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.background,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textGrey,
    textAlign: "center",
    marginBottom: 22,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  dropdownText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  dropdownList: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginTop: 8,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  submitButton: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 26,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 18,
  },
  cancelText: {
    color: COLORS.textGrey,
    fontSize: 15,
    fontWeight: "600",
  },
});
