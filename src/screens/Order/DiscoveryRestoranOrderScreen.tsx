import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 0.8; // Висота зображення займає 80% ширини

// Локальний ассет, який використовувався у ваших зображеннях
const DISH_IMAGE = require("../components/pasta.jpg");

// --- ДАНІ СТРАВИ (Імітація) ---
const dishData = {
  restaurantName: "La Pasta House",
  dishName: "Amatriciana pasta",
  description:
    "Tomato sauce, smoked pork neck, red onions, pecorino cheese, chilli. (All meat is slow-cooked in an aromatic blend of spices and chilies)",
  trustpilotRating: 4.3,
  googleRating: 4.0,
  price: 45, // AED
};

// --- КОМПОНЕНТ РЕЙТИНГУ ---

interface RatingPillProps {
  platform: "Trustpilot" | "Google";
  rating: number;
  color: string;
  iconName: string;
}

const RatingPill: React.FC<RatingPillProps> = ({
  platform,
  rating,
  color,
  iconName,
}) => (
  <View style={[styles.ratingPill, { backgroundColor: color }]}>
    {/* ЗМІНА: Встановлюємо колір іконки на білий (#fff) */}
    <MaterialCommunityIcons name={iconName as any} size={14} color="#fff" />
    <Text style={styles.ratingText}>
      {platform} {rating}
    </Text>
  </View>
);

// --- ОСНОВНИЙ КОМПОНЕНТ ---

const DishDetailScreen: React.FC<{ onOrderPress: () => void }> = ({
  onOrderPress,
}) => {
  // Функція-заглушка для навігації "Назад"
  const handleBack = () => {
    console.log("Navigation back not implemented.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Блок 1: Зображення та Кнопка Назад */}
        <View style={styles.imageContainer}>
          <Image source={DISH_IMAGE} style={styles.dishImage} />
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={30} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Блок 2: Деталі Страви */}
        <View style={styles.detailsCard}>
          <View style={styles.restaurantInfo}>
            <MaterialCommunityIcons
              name="home-outline"
              size={20}
              color="#333"
            />
            <Text style={styles.restaurantName}>{dishData.restaurantName}</Text>
          </View>

          <Text style={styles.dishName}>{dishData.dishName}</Text>
          <Text style={styles.dishDescription}>{dishData.description}</Text>

          {/* Рейтинги */}
          <View style={styles.ratingsContainer}>
            <RatingPill
              platform="Trustpilot"
              rating={dishData.trustpilotRating}
              color="#4CAF50" // Зелений
              iconName="star"
            />
            <RatingPill
              platform="Google"
              rating={dishData.googleRating}
              color="#3f84f8" // Синій
              // УВАГА: Для Google ми використовуємо значок 'google' з MaterialCommunityIcons.
              // Якщо ви хочете використовувати іконку Google в одному кольорі (як на фото),
              // вона має бути монохромною. MaterialCommunityIcons має значок 'google',
              // який можна використовувати в одному кольорі.
              iconName="google"
            />
          </View>

          {/* Тут може бути більше контенту (інгредієнти, відгуки тощо) */}
        </View>
      </ScrollView>

      {/* Блок 3: Фіксована Кнопка Замовлення */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderButton} onPress={onOrderPress}>
          <Text style={styles.orderButtonText}>
            Order Now | AED {dishData.price}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- СТИЛІ ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  dishImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 10,
    left: 10,
    padding: 10,
    borderRadius: 50,
    // Можна додати легкий фон або тінь для кращої видимості на зображенні
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // Перекриває нижню частину зображення
    padding: 25,
    paddingBottom: 100, // Забезпечення прокрутки над футером
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginLeft: 8,
  },
  dishName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  ratingsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },

  // Фіксований Футер
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  orderButton: {
    backgroundColor: "#E57373", // Основний акцентний колір
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default DishDetailScreen;
