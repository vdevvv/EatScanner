import {FC} from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {ModalProps} from "./modal.types";

const MENU_OPTIONS = [
  "Share Profile",
  "Remove Friend",
  "Block User",
  "Report",
];

interface FriendsProfileMenu extends ModalProps{
  fadeAnim: Animated.Value;
  onPressOption: (option: string) => void;
}

const FriendsProfileMenu: FC<FriendsProfileMenu> = (
  {
    isVisible,
    fadeAnim,
    closeModal,
    onPressOption,
  }) => {
  return (
    <Modal visible={isVisible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={closeModal}>
        <Animated.View style={[styles.overlay, {opacity: fadeAnim}]}/>
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.menuContainer,
          {opacity: fadeAnim, transform: [{scale: fadeAnim}]},
        ]}
      >
        {MENU_OPTIONS.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              option === "Report" && {
                borderTopWidth: 1,
                borderColor: '#E5E7EB',
              },
            ]}
            onPress={() => onPressOption(option)}
          >
            <Text
              style={[
                styles.menuText,
                option === "Report" && {color: "#E53E3E"},
              ]}
            >
              {option}
            </Text>
            <Ionicons
              name="person-outline"
              size={18}
              color={option === "Report" ? "#E53E3E" : '#1F2937'}
            />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Modal>
  );
};

export default FriendsProfileMenu;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  menuContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 6,
    minWidth: 220,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 6,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuText: {fontSize: 16, fontWeight: "500", color: "#1F2937"},
});
