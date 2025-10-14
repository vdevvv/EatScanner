// src/screens/ReportUserModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  white: "#FFFFFF",
  overlay: "rgba(0,0,0,0.5)",
  textDark: "#111827",
  textGray: "#6B7280",
  border: "#E5E7EB",
  primary: "#E9725C",
};

const ReportUserModal = () => {
  const [visible, setVisible] = useState(true);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const toggleModal = () => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(!visible));
  };

  const REASONS = [
    "Inappropriate content",
    "Spam or scam",
    "Fake account",
    "Harassment or hate speech",
    "Other",
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
          <View style={styles.overlay}>
            <Animated.View style={styles.card}>
              {/* Close button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
              >
                <Ionicons name="close" size={22} color={COLORS.textDark} />
              </TouchableOpacity>

              {/* Title */}
              <Text style={styles.title}>Report This User?</Text>
              <Text style={styles.subtitle}>
                Choose a reason below. This won’t notify the user.
              </Text>

              {/* Dropdown */}
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !selectedReason && { color: COLORS.textGray },
                  ]}
                >
                  {selectedReason || "Select a reason"}
                </Text>
                <Ionicons
                  name={dropdownOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={COLORS.textGray}
                />
              </TouchableOpacity>

              {/* Dropdown list */}
              {dropdownOpen && (
                <View style={styles.dropdownList}>
                  {REASONS.map((reason, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedReason(reason);
                        setDropdownOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{reason}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Submit button */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !selectedReason && { opacity: 0.6 },
                ]}
                disabled={!selectedReason}
                onPress={() => {
                  alert(`Report submitted for: ${selectedReason}`);
                  setVisible(false);
                }}
              >
                <Text style={styles.submitText}>Submit Report</Text>
              </TouchableOpacity>

              {/* Cancel button */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default ReportUserModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 28,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 6,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textGray,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  dropdownText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 18,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.white,
  },
  dropdownItemText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },
  cancelButton: {
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    color: COLORS.textGray,
    fontWeight: "600",
  },
});
