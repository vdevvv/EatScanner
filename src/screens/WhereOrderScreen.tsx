import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- КОНФІГУРАЦІЯ ТА ДАНІ ---
const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C", // Червоно-помаранчевий (Активний)
  disabled: "#D1D5DB", // Світло-сірий (Неактивний)
  background: "#FFFFFF",
  textDark: "#1F2937", // Темний текст
  textGrey: "#6B7280", // Сірий текст
  divider: "#E5E7EB", // Світло-сірий розділювач
  white: "#FFFFFF",
  iconGreen: "#10B981",
  iconRed: "#EF4444",
  googleColor: "#4285F4",
};

// Дані для картки ресторану
const RESTAURANT_DATA = {
  name: "Grandma's Kettle",
  subtitle: "Chefs Hall",
  trustpilotRating: 4.3,
  googleRating: 4.0,
  imageSource: require("../../assets/dumplings-top.jpg") as ImageSourcePropType, // Placeholder
};

// Дані для варіантів замовлення
const ORDER_OPTIONS = [
  {
    id: "website",
    name: "Order on Restaurant Website",
    details: "Fastest delivery & discounts",
    deliveryTime: null,
    price: null,
  },
  {
    id: "uber_eats",
    name: "Uber Eats",
    details: "Estimated delivery: 25–35 mins",
    price: 55, // AED
  },
  {
    id: "talabat",
    name: "Talabat",
    details: "Estimated delivery: 45–55 mins",
    price: 45, // AED
  },
  {
    id: "deliveroo",
    name: "Deliveroo",
    details: "Estimated delivery: 55–60 mins",
    price: 47, // AED
  },
];

// --- ДОПОМІЖНІ КОМПОНЕНТИ ---

interface RadioItemProps {
  item: (typeof ORDER_OPTIONS)[0];
  isSelected: boolean;
  onSelect: (id: string) => void;
}

// Компонент однієї опції замовлення з радіокнопкою
const RadioItem: React.FC<RadioItemProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  const borderColor = isSelected ? COLORS.textDark : COLORS.divider;
  const dotColor = isSelected ? COLORS.textDark : "transparent";

  return (
    <TouchableOpacity
      style={[styles.radioItem, { borderColor }]}
      onPress={() => onSelect(item.id)}
      activeOpacity={0.7}
    >
      {/* Радіокнопка */}
      <View
        style={[
          styles.radioCircle,
          {
            borderColor:
              dotColor === "transparent" ? COLORS.textGrey : COLORS.textDark,
          },
        ]}
      >
        {isSelected && <View style={styles.radioDot} />}
      </View>

      {/* Контент опції */}
      <View style={styles.radioContent}>
        <Text style={styles.radioName}>{item.name}</Text>
        <View style={styles.radioDetailsRow}>
          <Text style={styles.radioDetailsText}>{item.details}</Text>
          {item.price !== null && (
            <Text style={[styles.radioDetailsText, styles.radioPriceText]}>
              {" | AED "}
              {item.price}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Компонент картки ресторану у верхній частині
const RestaurantCard: React.FC = () => (
  <View style={styles.restaurantCard}>
    <Image
      source={RESTAURANT_DATA.imageSource}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardTextContent}>
      <Text style={styles.cardTitle}>{RESTAURANT_DATA.name}</Text>
      <Text style={styles.cardSubtitle}>{RESTAURANT_DATA.subtitle}</Text>
      <View style={styles.cardRatings}>
        <Ionicons name="star" size={14} color={COLORS.iconGreen} />
        <Text style={styles.cardRatingText}>
          {RESTAURANT_DATA.trustpilotRating.toFixed(1)}
        </Text>

        <Ionicons
          name="logo-google"
          size={14}
          color={COLORS.googleColor}
          style={{ marginLeft: 10 }}
        />
        <Text style={styles.cardRatingText}>
          {RESTAURANT_DATA.googleRating.toFixed(1)}
        </Text>
      </View>
    </View>
  </View>
);

// --- ОСНОВНИЙ ЕКРАН ---

const OrderOptionsScreen: React.FC = () => {
  // 1. Початковий стан встановлено на null, що означає "нічого не вибрано"
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Визначаємо, чи кнопка активна
  const isButtonActive = selectedOption !== null;
  // Визначаємо колір кнопки
  const buttonColor = isButtonActive ? COLORS.primary : COLORS.disabled;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Хедер */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => console.log("Close/Back")}
        >
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Where to Order</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Картка ресторану */}
        <RestaurantCard />

        {/* Заголовок опцій */}
        <Text style={styles.availableOnTitle}>Available on:</Text>

        {/* Список опцій замовлення */}
        <View style={styles.radioGroup}>
          {ORDER_OPTIONS.map((item) => (
            <RadioItem
              key={item.id}
              item={item}
              isSelected={selectedOption === item.id}
              onSelect={setSelectedOption}
            />
          ))}
        </View>

        {/* Повідомлення про ціни */}
        <Text style={styles.noteText}>
          Prices and availability may vary by platform.
        </Text>

        {/* Додатковий простір для скролінгу */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 🚀 Нижня кнопка "Make an order" */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.orderButton, { backgroundColor: buttonColor }]}
          onPress={() =>
            isButtonActive && console.log(`Ordering via: ${selectedOption}`)
          }
          // 2. Деактивуємо кнопку, якщо нічого не вибрано
          disabled={!isButtonActive}
        >
          <Text style={styles.orderButtonText}>Make an order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- СТИЛІЗАЦІЯ ---

const PADDING_HORIZONTAL = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: 120,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginLeft: 10,
  },
  // --- Картка Ресторану ---
  restaurantCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardTextContent: {
    marginLeft: 15,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textGrey,
    marginTop: 2,
    marginBottom: 4,
  },
  cardRatings: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRatingText: {
    fontSize: 14,
    color: COLORS.textGrey,
    marginLeft: 4,
  },
  // --- Радіокнопки ---
  availableOnTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    // borderColor встановлюється динамічно
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    // borderColor встановлюється динамічно
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.textDark,
  },
  radioContent: {
    flex: 1,
  },
  radioName: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textDark,
  },
  radioDetailsRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  radioDetailsText: {
    fontSize: 13,
    color: COLORS.textGrey,
  },
  radioPriceText: {
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  noteText: {
    fontSize: 13,
    color: COLORS.textGrey,
    lineHeight: 20,
    marginBottom: 20,
  },
  // --- Нижня панель ---
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingBottom: 15 + (StatusBar.currentHeight || 0),
  },
  orderButton: {
    // backgroundColor встановлюється динамічно
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    // Прибираємо тіні для неактивної кнопки
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default OrderOptionsScreen;
