import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  background: "#FFFFFF",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  overlay: "rgba(0,0,0,0.4)",
  divider: "#E5E7EB",
};

const RemoveFriendModalScreen = () => {
  const [visible, setVisible] = useState(true);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  const handleRemove = () => {
    // Тут можна викликати функцію видалення друга
    closeModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" />

      <Modal visible={visible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={[styles.overlay, { opacity: opacityAnim }]} />
        </TouchableWithoutFeedback>

        <View style={styles.centeredView}>
          <Animated.View
            style={[styles.modalView, { transform: [{ scale: scaleAnim }] }]}
          >
            {/* Close icon */}
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Ionicons name="close" size={22} color={COLORS.textDark} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Remove This Friend?</Text>
            <Text style={styles.subtitle}>
              You’ll no longer see each other’s shared videos and orders.
            </Text>

            {/* Remove button */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemove}
              activeOpacity={0.8}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>

            {/* Cancel button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={closeModal}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RemoveFriendModalScreen;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: width * 0.8,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 14,
    right: 14,
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
    fontSize: 15,
    color: COLORS.textGrey,
    textAlign: "center",
    marginBottom: 26,
    lineHeight: 20,
  },
  removeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  removeButtonText: {
    color: COLORS.background,
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelText: {
    color: COLORS.textDark,
    fontWeight: "500",
    fontSize: 16,
  },
});
