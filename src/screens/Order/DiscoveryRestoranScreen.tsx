import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageSourcePropType,
  Dimensions,
  ImageBackground,
  Platform, // Додано для SafeAeraView
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи для навігації
type RootStackParamList = {
  HomePageScreen: undefined;
  DiscoveryRestoranScreen: undefined;
};

type DiscoveryRestoranNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DiscoveryRestoranScreen"
>;

// Використовуємо локальні ассети згідно з вашими шляхами
const MAIN_IMAGE = require("../../assets/dumplings-top.jpg");
const SUSHI_IMAGE = require("../../assets/sushi-dragons.jpg");
const POTATOES_IMAGE = require("../../assets/potato-green.jpg");
const PASTA_SMALL_IMAGE = require("../../assets/pasta.jpg");

const { width } = Dimensions.get("window");

// --- ДАНІ ---

interface HighlightedItem {
  id: number;
  name: string;
  subtitle: string;
  image: ImageSourcePropType;
}

const HIGHLIGHTED_ITEMS: HighlightedItem[] = [
  {
    id: 1,
    name: "Sushi Dragons",
    subtitle: "@ Chefs Hall",
    image: SUSHI_IMAGE,
  },
  {
    id: 2,
    name: "Herbed Golden Potatoes",
    subtitle: "@ A Mano",
    image: POTATOES_IMAGE,
  },
  { id: 3, name: "Sushi Rolls", subtitle: "@ Gochi", image: SUSHI_IMAGE },
];

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Amatriciana pasta",
    description:
      "Tomato sauce, smoked pork neck, red onions. pecorino cheese, chilli.",
    price: 45,
    image: PASTA_SMALL_IMAGE,
  },
  {
    id: 2,
    name: "Amatriciana pasta",
    description:
      "Tomato sauce, smoked pork neck, red onions. pecorino cheese, chilli.",
    price: 45,
    image: PASTA_SMALL_IMAGE,
  },
  {
    id: 3,
    name: "Amatriciana pasta",
    description:
      "Tomato sauce, smoked pork neck, red onions. pecorino cheese, chilli.",
    price: 45,
    image: PASTA_SMALL_IMAGE,
  },
  {
    id: 4,
    name: "Amatriciana pasta",
    description:
      "Tomato sauce, smoked pork neck, red onions. pecorino cheese, chilli.",
    price: 45,
    image: PASTA_SMALL_IMAGE,
  },
];

// --- КОМПОНЕНТИ ---

const RatingPill: React.FC<{
  iconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap;
  text: string;
  color: string;
  isMaterial?: boolean;
}> = ({ iconName, text, color, isMaterial = false }) => (
  <View style={styles.ratingPillContainer}>
    {/* Колірний фон тепер тільки для іконки */}
    <View style={[styles.ratingIconWrapper, { backgroundColor: color }]}>
      {isMaterial ? (
        <MaterialIcons
          name={iconName as keyof typeof MaterialIcons.glyphMap}
          size={14}
          color="white"
        />
      ) : (
        <Ionicons
          name={iconName as keyof typeof Ionicons.glyphMap}
          size={14}
          color="white"
        />
      )}
    </View>
    {/* Текст без фону */}
    <Text style={styles.ratingPillText}>{text}</Text>
  </View>
);

const HighlightedCard: React.FC<{ item: HighlightedItem }> = ({ item }) => (
  <TouchableOpacity style={styles.highlightedCard}>
    <Image source={item.image} style={styles.highlightedImage} />
    <View style={styles.highlightedTextOverlay}>
      <Text style={styles.highlightedTitle}>{item.name}</Text>
      <Text style={styles.highlightedSubtitle}>{item.subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const MenuFilterButton: React.FC<{
  icon: string;
  label: string;
  isActive: boolean;
}> = ({ icon, label, isActive }) => (
  <TouchableOpacity
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
  >
    <Text style={styles.filterIcon}>{icon}</Text>
    <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => (
  <TouchableOpacity style={styles.menuItemCard}>
    <Image source={item.image} style={styles.menuItemImage} />
    <View style={styles.menuItemTextContainer}>
      <Text style={styles.menuItemTitle}>{item.name}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <Text style={styles.menuItemPrice}>AED {item.price}</Text>
    </View>
  </TouchableOpacity>
);

// --- ОСНОВНИЙ КОМПОНЕНТ ---

const RestaurantMenuScreen: React.FC = () => {
  const navigation = useNavigation<DiscoveryRestoranNavigationProp>();

  const handleBackPress = () => {
    navigation.navigate("HomePageScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. Блок Зображення та Хедер */}
        <ImageBackground source={MAIN_IMAGE} style={styles.headerImage}>
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* 2. Інформаційний Блок Ресторану */}
        <View style={styles.infoBlock}>
          <Text style={styles.restaurantTitle}>La Pasta House</Text>
          <Text style={styles.restaurantSubtitle}>
            An authentic Italian touch and delicious!
          </Text>

          {/* Рейтинги */}
          <View style={styles.ratingsContainer}>
            <RatingPill
              iconName="star"
              text="Trustpilot 4.3"
              color="#4CAF50"
              isMaterial={true} // Ionicons 'star' не має того вигляду
            />
            <RatingPill
              iconName="star"
              text="Google 4.0"
              color="#3f84f8"
              isMaterial={true}
            />
          </View>

          {/* Розташування */}
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#888" />
            <Text style={styles.locationText}>Dubai</Text>
            <Text style={styles.distanceText}>3 miles away</Text>
          </View>
        </View>

        {/* 3. Виділені Страви */}
        <View style={styles.highlightedSection}>
          <View style={styles.highlightedHeader}>
            <Text style={styles.sectionTitle}>Highlighted items:</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.highlightedScroll}
          >
            {HIGHLIGHTED_ITEMS.map((item) => (
              <HighlightedCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* 4. Меню та Фільтри */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>

          <View style={styles.filterContainer}>
            <MenuFilterButton icon="🍴" label="Mains" isActive={true} />
            <MenuFilterButton icon="🍰" label="Dessert" isActive={false} />
            <MenuFilterButton icon="🥤" label="Drink" isActive={false} />
          </View>

          {/* Список страв */}
          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- СТИЛІ ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // 1. Хедер та Навігація
  headerImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-start",
  },
  headerOverlay: {
    // Використовуємо абсолютне позиціонування для кращого контролю
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === "android" ? 30 : 50, // Зсув для iOS Safe Area
    paddingHorizontal: 20,
    flexDirection: "row", // Щоб розмістити елементи в ряд, якщо вони будуть додані
    justifyContent: "flex-start",
    zIndex: 10, // Гарантуємо, що кнопка поверх ImageBackground
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 5,
    alignSelf: "flex-start", // Вирівнюємо лише кнопку
  },

  // 2. Інформаційний Блок
  infoBlock: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: -40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  restaurantTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  restaurantSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  ratingsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },

  // СТИЛІ ДЛЯ ВИПРАВЛЕННЯ Trustpilot/Google Pill
  ratingPillContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8, // Додаємо padding праворуч лише для тексту
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: "#fff", // Видаляємо кольоровий фон з контейнера
    borderWidth: 1,
    borderColor: "#f0f0f0", // Легка рамка, як на скріншоті
    overflow: "hidden",
  },
  ratingIconWrapper: {
    padding: 4,
    borderRadius: 15,
    marginRight: 4,
  },
  ratingPillText: {
    color: "#333", // Змінюємо колір тексту на чорний/сірий
    fontSize: 12,
    fontWeight: "600",
  },

  // Інші стилі, що залишилися без змін
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 4,
  },
  distanceText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
  },
  highlightedSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  highlightedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  viewAllText: {
    fontSize: 14,
    color: "#E57373",
    fontWeight: "600",
  },
  highlightedScroll: {
    paddingBottom: 20,
  },
  highlightedCard: {
    width: width * 0.45,
    height: width * 0.6,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  highlightedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  highlightedTextOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  highlightedTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  highlightedSubtitle: {
    color: "#eee",
    fontSize: 12,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: "#FBE6E3",
  },
  filterIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  filterLabelActive: {
    color: "#E57373",
    fontWeight: "700",
  },
  menuList: {
    // Стилі контейнера для списку
  },
  menuItemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 15,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: "cover",
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  menuItemDescription: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
    marginBottom: 5,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E57373",
  },
});

export default RestaurantMenuScreen;
