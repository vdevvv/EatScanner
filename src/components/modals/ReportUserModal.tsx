import React, {FC, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../../constants/colors";
import {ModalProps} from "./modal.types";

const REPORT_REASONS = [
  "Spam",
  "Inappropriate content",
  "Harassment or bullying",
  "Fake profile",
  "Other",
];

const ReportUserModal: FC<ModalProps> = ({isVisible, closeModal}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedReason) return;
    console.log(`Reported for: ${selectedReason}`);
    closeModal()
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeModal}
          >
            <Ionicons name="close" size={22} color="#374151"/>
          </TouchableOpacity>
          <Text style={styles.title}>Report This User?</Text>
          <Text style={styles.subtitle}>
            Choose a reason below. This won’t notify the user.
          </Text>
          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.8}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text
              style={[
                styles.dropdownText,
                !selectedReason && {color: "#9CA3AF"},
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
          {dropdownOpen && (
            <View style={styles.dropdownList}>
              <FlatList
                data={REPORT_REASONS}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
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
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: selectedReason
                  ? "#E9725C"
                  : '#E5E7EB',
              },
            ]}
            disabled={!selectedReason}
            onPress={handleSubmit}
            activeOpacity={0.9}
          >
            <Text style={styles.submitText}>Submit Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={closeModal}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.white,
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
    color: '#111827',
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: "center",
    marginBottom: 22,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  dropdownText: {
    fontSize: 15,
    color: '#111827',
  },
  dropdownList: {
    width: "100%",
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    color: '#111827',
  },
  submitButton: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 26,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 18,
  },
  cancelText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },
})

export default ReportUserModal;