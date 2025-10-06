import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageSourcePropType,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// 💡 НОВЕ: 1. Імпортуємо локальне зображення з папки assets
// Вам потрібно переконатися, що файл 'potato-green.jpg' знаходиться у папці 'assets/'
const localImage = require("../../assets/potato-green.jpg");

// --- Конфігурація ---
const COLORS = {
  primary: "#E9725C",
  secondary: "#A8574B",
  white: "#FFFFFF",
  text: "#333333",
  shadow: "rgba(0, 0, 0, 0.4)",
};

interface DishData {
  title: string;
  restaurant: string;
  location: string;
  distance: string;
  rating: number;
  userRating: number;
  price: number;
  imageSource: ImageSourcePropType;
}

const DISH_DATA: DishData = {
  title: "Herbed Golden Potatoes",
  restaurant: "Love Restaurant",
  location: "Dubai",
  distance: "3 miles away",
  rating: 5.0,
  userRating: 4.8,
  price: 45, // AED
  imageSource: localImage,
};

// --- Компонент Головного Екрану ---
const HomePageScreen: React.FC = () => {
  const {
    title,
    restaurant,
    location,
    distance,
    rating,
    userRating,
    price,
    imageSource,
  } = DISH_DATA;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 🖼️ Фонове зображення та верхній контент */}
      <ImageBackground source={imageSource} style={styles.imageBackground}>
        {/* Градієнт внизу для кращої видимості тексту */}
        <LinearGradient
          colors={["transparent", "transparent", COLORS.shadow]}
          style={styles.bottomGradient}
        />

        {/* ⬆️ Верхня панель (Час та Іконки) */}
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => console.log("Back")}
          >
            <Ionicons name="chevron-back" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => console.log("Notifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Основний вміст екрану (всередині зображення) */}
        <View style={styles.contentWrapper}>
          {/* 🍽️ Заголовок страви */}
          <Text style={styles.dishTitle}>{title}</Text>

          {/* ⭐️ Бокові іконки (Share/Save) */}
          <View style={styles.sideIcons}>
            {/* 💡 ВИПРАВЛЕНО: Змінено іконку на 'send-outline' для "Телеграми" */}
            <TouchableOpacity style={styles.sideIconItem}>
              <Ionicons
                name="send-outline"
                size={28} // Збільшено розмір іконки
                color={COLORS.white}
              />
              {/* 💡 ВИПРАВЛЕНО: Збільшено розмір шрифту */}
              <Text style={styles.sideIconTextLarge}>Share</Text>
            </TouchableOpacity>
            {/* Іконка Save */}
            <TouchableOpacity style={styles.sideIconItem}>
              <Ionicons
                name="bookmark-outline"
                size={28} // Збільшено розмір іконки
                color={COLORS.white}
              />
              {/* 💡 ВИПРАВЛЕНО: Збільшено розмір шрифту */}
              <Text style={styles.sideIconTextLarge}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🏢 Блок з інформацією про ресторан та кнопки */}
        <View style={styles.infoBlock}>
          <Text style={styles.restaurantTitle}>{restaurant}</Text>

          {/* Місцезнаходження та рейтинги */}
          <View style={styles.metaRow}>
            <Ionicons
              name="location-sharp"
              size={16}
              color={COLORS.primary}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.metaText}>{location}</Text>
            <Text style={styles.metaTextDivider}>•</Text>
            <Text style={styles.metaText}>{distance}</Text>
          </View>
          <View style={styles.ratingRow}>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={12} color={COLORS.white} />
              <Text style={styles.ratingText}>{rating} Rating</Text>
            </View>
            <View
              style={[styles.ratingBox, { backgroundColor: COLORS.secondary }]}
            >
              <Text style={styles.ratingText}>{userRating} Rating</Text>
            </View>
          </View>

          {/* Кнопки замовлення та перегляду */}
          <View style={styles.buttonRow}>
            {/* Кнопка View Dish */}
            <TouchableOpacity
              style={[styles.actionButton, styles.viewDishButton]}
            >
              <LinearGradient
                colors={["#A8574B", "#924B42"]} // Трохи темніший градієнт
                style={styles.gradientFill}
              >
                <Text style={styles.viewDishText}>View Dish</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Кнопка Order Now */}
            <TouchableOpacity
              style={[styles.actionButton, styles.orderNowButton]}
            >
              <Text style={styles.orderNowText}>Order Now | AED {price}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* ⬇️ Фіксована нижня навігація */}
      <View style={styles.bottomNav}>
        <BottomNavItem iconName="home" label="Home" active />
        <BottomNavItem iconName="search-outline" label="Discovery" />
        <BottomNavItem iconName="chatbubble-outline" label="Chats" />
        <BottomNavItem iconName="people-outline" label="My Friends" />
        <BottomNavItem iconName="person-outline" label="Profile" />
      </View>
    </View>
  );
};

// --- Компонент Нижнього Навігатора ---
interface NavItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
}

const BottomNavItem: React.FC<NavItemProps> = ({
  iconName,
  label,
  active = false,
}) => (
  <TouchableOpacity style={styles.navItem}>
    <Ionicons
      name={active ? (iconName as any).replace("-outline", "") : iconName}
      size={22}
      color={active ? COLORS.primary : COLORS.text}
    />
    <Text
      style={[
        styles.navText,
        {
          color: active ? COLORS.primary : COLORS.text,
          fontWeight: active ? "bold" : "normal",
        },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// --- Стилізація ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%", // Висота градієнта
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 45, // Відступ під iOS StatusBar
  },
  headerIcon: {
    padding: 5,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  dishTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.white,
    // Розташовуємо заголовок ближче до верху
    position: "absolute",
    top: 100,
    left: 20,
    right: 150, // Щоб не наїжджало на іконки
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sideIcons: {
    position: "absolute",
    top: 430, // 💡 ВИПРАВЛЕНО: Опустили блок іконок ще нижче (з 380 до 430)
    right: 20,
    alignItems: "center",
  },
  sideIconItem: {
    alignItems: "center",
    marginBottom: 35, // Збільшили відступ між іконками
  },
  sideIconText: {
    fontSize: 12, // Старий розмір
    color: COLORS.white,
    marginTop: 2,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  sideIconTextLarge: {
    fontSize: 14, // 💡 НОВЕ: Збільшений розмір шрифту
    color: COLORS.white,
    marginTop: 4,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  infoBlock: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  restaurantTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.white,
  },
  metaTextDivider: {
    fontSize: 14,
    color: COLORS.white,
    marginHorizontal: 8,
  },
  ratingRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Напівпрозорий білий фон
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.white,
    marginLeft: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  actionButton: {
    height: 50,
    borderRadius: 10,
    overflow: "hidden", // Для градієнта
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  gradientFill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  viewDishButton: {
    flex: 1,
    marginRight: 10,
  },
  viewDishText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  orderNowButton: {
    flex: 1.5,
    backgroundColor: COLORS.primary, // Фон для кнопки "Order Now"
    justifyContent: "center",
    alignItems: "center",
  },
  orderNowText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  // --- Стилі нижньої навігації ---
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70, // Висота панелі
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  navItem: {
    alignItems: "center",
    padding: 5,
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default HomePageScreen;
