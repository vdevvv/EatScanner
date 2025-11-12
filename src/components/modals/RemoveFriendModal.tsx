import React, {FC} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {ModalProps} from "./modal.types";
import {COLORS} from "../../constants/colors";

const RemoveFriendModal: FC<ModalProps> = ({isVisible, closeModal}) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={closeModal}
          >
            <Ionicons name="close" size={22} color="#374151" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Remove This Friend?</Text>
          <Text style={styles.modalSubtitle}>
            You'll no longer see each other's shared videos and orders.
          </Text>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={closeModal}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={closeModal}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: { position: "absolute", top: 14, right: 14, padding: 8 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  removeButton: {
    backgroundColor: COLORS.red,
    borderRadius: 12,
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 22,
  },
  removeButtonText: { fontSize: 16, fontWeight: "700", color: COLORS.white },
  cancelButton: { marginTop: 16 },
  cancelButtonText: { fontSize: 15, color: COLORS.grey30, fontWeight: "600" },
})

export default RemoveFriendModal;