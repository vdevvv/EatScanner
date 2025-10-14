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
  ImageBackground,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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

// ---------------- MOCK DATA -----------------
const AVATAR_SOURCE = require("../../assets/profile-avatar.jpg");
const DISH_1 = require("../../assets/sushi-dragons.jpg");
const DISH_2 = require("../../assets/potatoes-square.jpg");

const USER_DATA = {
  handle: "@foodie_iryna",
  name: "Talia Gomez",
  stats: [
    { label: "Saved", count: 46 },
    { label: "Friends", count: 212 },
    { label: "Shared orders", count: 212 },
    { label: "Shared videos", count: 212 },
  ],
  avatar: AVATAR_SOURCE,
};

// ---------------- MAIN SCREEN -----------------
const UserProfileScreen: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
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
        <View style={styles.profileBlock}>
          <Image source={USER_DATA.avatar} style={styles.avatar} />
          <Text style={styles.userName}>{USER_DATA.name}</Text>

          <View style={styles.statsRow}>
            {USER_DATA.stats.map((s, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statCount}>{s.count}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.galleryRow}>
          {[DISH_1, DISH_2, DISH_1, DISH_2, DISH_1, DISH_2].map((img, i) => (
            <ImageBackground key={i} source={img} style={styles.galleryItem} />
          ))}
        </View>
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
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              setTimeout(() => setReportVisible(true), 200);
            }}
          >
            <Text style={[styles.menuText, { color: "#E53E3E" }]}>Report</Text>
            <Ionicons name="flag-outline" size={18} color="#E53E3E" />
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {/* Report Modal */}
      <ReportUserModal
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
      />
    </SafeAreaView>
  );
};

// ---------------- REPORT MODAL -----------------
const ReportUserModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [reason, setReason] = useState("Spam");
  const [description, setDescription] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleShow = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  const handleHide = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setStep("form");
      setReason("Spam");
      setDescription("");
      onClose();
    });
  };

  const handleSubmit = () => {
    setStep("submitted");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onShow={handleShow}
    >
      <TouchableWithoutFeedback onPress={handleHide}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          {step === "form" ? (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Report This User?</Text>
                <TouchableOpacity onPress={handleHide}>
                  <Ionicons name="close" size={22} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              <Text style={styles.subText}>
                Choose a reason below. This won’t notify the user.
              </Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={reason}
                  onValueChange={(v) => setReason(v)}
                  style={styles.picker}
                  dropdownIconColor={COLORS.textDark}
                >
                  <Picker.Item label="Spam" value="Spam" />
                  <Picker.Item
                    label="Inappropriate content"
                    value="Inappropriate content"
                  />
                  <Picker.Item
                    label="Harassment or bullying"
                    value="Harassment or bullying"
                  />
                  <Picker.Item label="Fake profile" value="Fake profile" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              {reason === "Other" && (
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Please describe the issue"
                    multiline
                    maxLength={200}
                    value={description}
                    onChangeText={setDescription}
                  />
                  <Text style={styles.charCount}>{description.length}/200</Text>
                </View>
              )}

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor:
                      description || reason !== "Other"
                        ? COLORS.primary
                        : "#ccc",
                  },
                ]}
                disabled={reason === "Other" && !description.trim()}
                onPress={handleSubmit}
              >
                <Text style={styles.submitText}>Submit Report</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleHide}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Report Submitted</Text>
              <Text style={styles.subText}>
                Thanks for helping keep our community safe. Our team will review
                this profile.
              </Text>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: COLORS.primary },
                ]}
                onPress={handleHide}
              >
                <Text style={styles.submitText}>Done</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

// ---------------- STYLES -----------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },
  scrollContent: { paddingBottom: 40 },

  profileBlock: { alignItems: "center", marginTop: 12 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 8 },
  userName: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  statsRow: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "space-around",
    width: "90%",
  },
  statItem: { alignItems: "center" },
  statCount: { fontSize: 18, fontWeight: "700", color: COLORS.textDark },
  statLabel: { fontSize: 12, color: COLORS.textGrey },

  galleryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  galleryItem: {
    width: width / 3,
    height: width / 3,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  menuContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  subText: { fontSize: 14, color: COLORS.textGrey, marginBottom: 16 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 10,
    marginBottom: 16,
  },
  picker: { height: 44, width: "100%" },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 10,
    marginBottom: 16,
    padding: 8,
  },
  input: {
    height: 80,
    textAlignVertical: "top",
    color: COLORS.textDark,
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: COLORS.textGrey,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    textAlign: "center",
    fontSize: 15,
    color: COLORS.textGrey,
    fontWeight: "500",
  },
});

export default UserProfileScreen;
