import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// 💡 Локальні зображення
const localImage = require("../../assets/potato-green.jpg");
const shareIcon = require("../../assets/Telegram.png");
const saveIcon = require("../../assets/Save.png");
const bellLinesIcon = require("../../assets/bell-lines.png"); // червоно-білі лінії

// --- Кольори ---
const COLORS = {
  primary: "#E9725C",
  secondary: "#A8574B",
  white: "#FFFFFF",
  text: "#333333",
  shadow: "rgba(0, 0, 0, 0.4)",
};

// --- Типи ---
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

// --- Тестові дані ---
const DISH_DATA: DishData = {
  title: "Herbed Golden Potatoes",
  restaurant: "Love Restaurant",
  location: "Dubai",
  distance: "3 miles away",
  rating: 5.0,
  userRating: 4.8,
  price: 45,
  imageSource: localImage,
};

// --- Основний компонент ---
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

      {/* 🖼️ Фон */}
      <ImageBackground source={imageSource} style={styles.imageBackground}>
        {/* 🖤 Напівпрозорий чорний фон */}
        <View style={styles.darkOverlay} />

        {/* 🎨 Градієнт знизу */}
        <LinearGradient
          colors={["transparent", "transparent", COLORS.shadow]}
          style={styles.bottomGradient}
        />

        {/* 🔝 Хедер */}
        <SafeAreaView style={styles.header}>
          <View style={styles.headerIcon} />
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

        {/* 🔴⚪ Напівпрозорі червоно-білі лінії */}
        <Image source={bellLinesIcon} style={styles.bellLinesImage} />

        {/* 📦 Контент */}
        <View style={styles.contentWrapper}>
          <Text style={styles.dishTitle}>{title}</Text>

          {/* 🧭 Іконки Share / Save */}
          <View style={styles.sideIcons}>
            <TouchableOpacity style={styles.sideIconItem}>
              <Image source={shareIcon} style={styles.sideIconImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sideIconItem}>
              <Image source={saveIcon} style={styles.sideIconImage} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 🏢 Інформаційний блок */}
        <View style={styles.infoBlock}>
          <Text style={styles.restaurantTitle}>{restaurant}</Text>

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

          {/* 🔘 Кнопки */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.viewDishButton]}
            >
              <Text style={styles.viewDishText}>View Dish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.orderNowButton]}
            >
              <Text style={styles.orderNowText}>Order Now | AED {price}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* ⬇️ Нижня навігація */}
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

// --- Компонент навігації ---
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

// --- Стилі ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  imageBackground: { flex: 1, width: "100%", justifyContent: "flex-end" },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 45,
    zIndex: 10,
  },

  headerIcon: { padding: 5 },

  // 🔴⚪ Лінії біло-червоні
  bellLinesImage: {
    position: "absolute",
    top: 65, // 45px (хедер) + 50px відступ
    right: 52,
    width: 350,
    height: 30,
    resizeMode: "contain",
    zIndex: 50000,
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
    position: "absolute",
    top: 100,
    left: 20,
    right: 150,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  sideIcons: {
    position: "absolute",
    top: 430,
    right: 20,
    alignItems: "center",
  },

  sideIconItem: { alignItems: "center", marginBottom: 35 },

  sideIconImage: {
    width: 66,
    height: 66,
    resizeMode: "contain",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
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

  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },

  metaText: { fontSize: 14, color: COLORS.white },

  metaTextDivider: { fontSize: 14, color: COLORS.white, marginHorizontal: 8 },

  ratingRow: { flexDirection: "row", marginBottom: 20 },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
    gap: 12,
  },

  actionButton: {
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },

  viewDishButton: {
    flex: 1,
    backgroundColor: "rgba(233, 114, 92, 0.3)",
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  viewDishText: { fontSize: 16, fontWeight: "bold", color: COLORS.white },

  orderNowButton: {
    flex: 1.2,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  orderNowText: { fontSize: 16, fontWeight: "bold", color: COLORS.white },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  navItem: { alignItems: "center", padding: 5 },

  navText: { fontSize: 12, marginTop: 2 },
});

export default HomePageScreen;
