import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ImageSourcePropType,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// --- Кольори ---
const COLORS = {
  primary: "#E9725C",
  secondary: "#A8574B",
  white: "#FFFFFF",
  text: "#333333",
  lightGray: "#F5F5F5",
  border: "#E5E5E5",
};

// --- Локальні зображення ---
const food1 = require("../../assets/food1.jpg") as ImageSourcePropType;
const food2 = require("../../assets/food2.jpg") as ImageSourcePropType;
const food3 = require("../../assets/food3.jpg") as ImageSourcePropType;
const food4 = require("../../assets/food4.jpg") as ImageSourcePropType;
const food5 = require("../../assets/food5.jpg") as ImageSourcePropType;
const food6 = require("../../assets/food6.jpg") as ImageSourcePropType;
const food7 = require("../../assets/food7.jpg") as ImageSourcePropType;
const food8 = require("../../assets/food8.jpg") as ImageSourcePropType;
const food9 = require("../../assets/food9.jpg") as ImageSourcePropType;

// --- Дані для сітки ---
const FOOD_IMAGES = [
  food1, food2, food3,
  food4, food5, food6,
  food7, food8, food9,
];

// --- Основний компонент ---
interface NoMoreResultsScreenProps {
  visible: boolean;
  onClose: () => void;
  onGoToFilters: () => void;
  onGoToDiscovery: () => void;
}

const NoMoreResultsScreen: React.FC<NoMoreResultsScreenProps> = ({
  visible,
  onClose,
  onGoToFilters,
  onGoToDiscovery,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        {/* Сітка зображень їжі */}
        <View style={styles.foodGrid}>
          {FOOD_IMAGES.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.foodImage}
              resizeMode="cover"
            />
          ))}
        </View>

        {/* Модальне вікно */}
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Кнопка закриття */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>

            {/* Заголовок */}
            <Text style={styles.modalTitle}>No More Results</Text>
            
            {/* Опис */}
            <Text style={styles.modalDescription}>
              No more restaurants to show
            </Text>

            {/* Кнопки */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onGoToFilters}
              >
                <Text style={styles.primaryButtonText}>Go To Filters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={onGoToDiscovery}
              >
                <Text style={styles.secondaryButtonText}>Go To Discovery Page</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// --- Стилі ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Сітка зображень
  foodGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  foodImage: {
    width: width / 3,
    height: height / 3,
  },

  // Модальне вікно
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },

  // Текст
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },

  // Кнопки
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});

export default NoMoreResultsScreen;
