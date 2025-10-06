import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- КОНФІГУРАЦІЯ ТА РЕСУРСИ ---
const { width, height } = Dimensions.get("window");

// Імітація даних страви
const DISH_DATA = {
  restaurantName: "La Pasta House",
  dishName: "Amatriciana pasta",
  description:
    "Tomato sauce, smoked pork neck, red onions, pecorino cheese, chilli.\n(All meat is slow-cooked in an aromatic blend of spices and chilies)",
  price: 45, // AED
  trustpilotRating: 4.3,
  googleRating: 4.0,
  // Примітка: Використовуємо placeholder для зображення, замість завантаженого файлу
  imageSource: require("../components/pasta.jpg") as ImageSourcePropType,
};

// Припустимо, що у вас є зображення для пасти.
// Якщо його немає, використовуємо універсальний колір, але для візуальної відповідності я імітую імпорт.
// Якщо ви зіткнетеся з помилкою "Unable to resolve", переконайтеся, що шлях до файлу правильний.
// Якщо ви не використовуєте цю структуру, просто замініть на:
// const dishImage = { uri: 'https://placehold.co/600x400/f0f0f0/333?text=Dish' };
const dishImage = DISH_DATA.imageSource;

const COLORS = {
  primary: "#E9725C", // Червоно-помаранчевий для кнопок
  background: "#FFFFFF",
  textDark: "#1F2937", // Темний текст
  textGrey: "#6B7280", // Сірий текст
  // Кольори для стилю пігулок (рамка та іконка)
  trustpilotColor: "#10B981", // Зелений Trustpilot
  googleColor: "#4285F4", // Синій Google
  white: "#FFFFFF",
};

// --- КОМПОНЕНТИ ІНТЕРФЕЙСУ ---

interface RatingPillProps {
  iconName: keyof typeof Ionicons.glyphMap;
  rating: number;
  source: "Trustpilot" | "Google";
}

// ✅ ВИПРАВЛЕНО: Стиль пігулки відповідно до скріншота (білий фон, кольорова рамка/іконка)
const RatingPill: React.FC<RatingPillProps> = ({
  iconName,
  rating,
  source,
}) => {
  const isTrustpilot = source === "Trustpilot";
  // Визначаємо колір рамки та іконки
  const accentColor = isTrustpilot
    ? COLORS.trustpilotColor
    : COLORS.googleColor;

  return (
    <View
      style={[
        styles.ratingPill,
        {
          borderColor: accentColor,
          // Фон повинен бути білим, а не залитим кольором
          backgroundColor: COLORS.white,
        },
      ]}
    >
      {/* Іконка кольору акценту */}
      <Ionicons
        name={iconName}
        size={14}
        color={accentColor}
        style={{ marginRight: 4 }}
      />
      {/* Текст темного кольору */}
      <Text style={styles.ratingTextPill}>
        {source} <Text style={{ fontWeight: "bold" }}>{rating.toFixed(1)}</Text>
      </Text>
    </View>
  );
};

// --- ОСНОВНИЙ ЕКРАН ---

const DishDetailScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 🖼️ Блок із зображенням та хедером */}
        <ImageBackground
          source={dishImage}
          style={styles.imageHeader}
          resizeMode="cover"
        >
          {/* Хедер (кнопка Назад) */}
          <SafeAreaView style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => console.log("Go Back")}
            >
              <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>

        {/* 📝 Блок з деталями (виходить за межі зображення) */}
        <View style={styles.detailsBlock}>
          {/* Іконка ресторану та назва */}
          <View style={styles.restaurantRow}>
            <Ionicons name="home-outline" size={22} color={COLORS.textDark} />
            <Text style={styles.restaurantName}>
              {" "}
              {DISH_DATA.restaurantName}
            </Text>
          </View>

          {/* Назва страви */}
          <Text style={styles.dishTitle}>{DISH_DATA.dishName}</Text>

          {/* Опис */}
          <Text style={styles.dishDescription}>{DISH_DATA.description}</Text>

          {/* Рейтинги */}
          <View style={styles.ratingsRow}>
            <RatingPill
              iconName="star"
              rating={DISH_DATA.trustpilotRating}
              source="Trustpilot"
            />
            <RatingPill
              iconName="logo-google"
              rating={DISH_DATA.googleRating}
              source="Google"
            />
          </View>
        </View>

        {/* Додатковий простір для скролінгу */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 🚀 Нижня кнопка "Order Now" */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>
            Order Now | AED {DISH_DATA.price.toFixed(0)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- СТИЛІЗАЦІЯ ---

const IMAGE_HEIGHT = height * 0.4;
const BLOCK_PADDING = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100, // Залишаємо місце для нижньої панелі
  },
  imageHeader: {
    width: width,
    height: IMAGE_HEIGHT,
    overflow: "visible",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContainer: {
    paddingHorizontal: BLOCK_PADDING / 2,
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  // Блок деталей, який накладається
  detailsBlock: {
    backgroundColor: COLORS.white,
    marginTop: -30, // Піднімає блок, щоб він накладався на зображення
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: BLOCK_PADDING,
    minHeight: height - IMAGE_HEIGHT + 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  restaurantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  dishTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textGrey,
    marginBottom: 20,
  },
  ratingsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Зменшуємо marginBottom
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    // ✅ Нові стилі для рамок
    borderWidth: 1,
  },
  ratingTextPill: {
    fontSize: 14,
    fontWeight: "normal", // Звичайний шрифт для слова "Trustpilot"/"Google"
    color: COLORS.textDark, // Темний текст
    marginLeft: 6, // Зберігаємо невеликий відступ
  },
  // --- Нижня панель ---
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: BLOCK_PADDING,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingBottom: 15 + (StatusBar.currentHeight || 0), // Компенсація для нижнього вирізу
  },
  orderButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default DishDetailScreen;
