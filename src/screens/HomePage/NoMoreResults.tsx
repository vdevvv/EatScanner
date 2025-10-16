import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// 🖼️ Приклади фото для фону
const IMAGES = [
  require("../../assets/food1.jpg"),
  require("../../assets/food2.jpg"),
  require("../../assets/food3.jpg"),
  require("../../assets/food4.jpg"),
  require("../../assets/food5.jpg"),
  require("../../assets/food6.jpg"),
  require("../../assets/food7.jpg"),
  require("../../assets/food8.jpg"),
  require("../../assets/food9.jpg"),
];

const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  primary: "#E9725C",
  secondary: "#F7E6E1",
  overlay: "rgba(0,0,0,0.35)",
  text: "#333333",
};

const NoMoreResultsScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* 🖼️ Сітка зображень на весь екран */}
      <View style={styles.imageGrid}>
        {IMAGES.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={styles.gridImage}
            resizeMode="cover"
          />
        ))}
      </View>

      {/* ⚪️ Модальне вікно */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* ❌ Кнопка закриття */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-outline" size={28} color={COLORS.black} />
            </TouchableOpacity>

            {/* 🧾 Текст */}
            <Text style={styles.modalTitle}>No More Results</Text>
            <Text style={styles.modalSubtitle}>
              No more restaurants to show
            </Text>

            {/* 🔘 Кнопки */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => console.log("Go To Filters")}
            >
              <Text style={styles.primaryButtonText}>Go To Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => console.log("Go To Discovery Page")}
            >
              <Text style={styles.secondaryButtonText}>
                Go To Discovery Page
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// --- 💅 Стилі ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: width,
    height: height,
  },
  gridImage: {
    width: width / 3,
    height: height / 3,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 25,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default NoMoreResultsScreen;
