import React, {FC} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {FriendsNavigationProp} from "../../navigations/AppNavigator";
import {useNavigation} from "@react-navigation/native";
import {ModalProps} from "./modal.types";
import {COLORS} from "../../constants/colors";

const BlockUserModal: FC<ModalProps> = ({isVisible, closeModal}) => {
  const navigation = useNavigation<FriendsNavigationProp>()

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={closeModal}
          >
            <Ionicons name="close" size={22} color="#374151"/>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Block This User?</Text>
          <Text style={styles.modalSubtitle}>
            They won’t be able to find or contact you.
          </Text>

          <TouchableOpacity
            style={styles.blockButton}
            onPress={() => {
              closeModal()
              navigation.navigate("BlockUser");
            }}
          >
            <Text style={styles.blockButtonText}>Block</Text>
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
    maxWidth: 380,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 26,
    paddingVertical: 32,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: {position: "absolute", top: 14, right: 14, padding: 8},
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  blockButton: {
    backgroundColor: COLORS.red,
    borderRadius: 12,
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  blockButtonText: {fontSize: 16, fontWeight: "700", color: COLORS.white},
  cancelButton: {marginTop: 16},
  cancelButtonText: {fontSize: 15, color: COLORS.grey30, fontWeight: "600"},
})

export default BlockUserModal;