import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
// Використовуємо Ionicons для всіх іконок (як вказано на макеті)
import { Ionicons } from "@expo/vector-icons";

// --- ІМІТАЦІЯ ДАНИХ КОНТЕНТУ З ЕМОДЗІ ТА КОЛЬОРАМИ ---
interface MealItem {
  id: string;
  title: string;
  restaurant: string;
  emoji: string;
  color: string;
}

// Набір страв, що імітують наявність локальних ассетів
const mockMeals: MealItem[] = [
  {
    id: "m1",
    title: "Sushi Dragons",
    restaurant: "Chefs Hall",
    emoji: "🍣",
    color: "#6A5ACD",
  },
  {
    id: "m2",
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    emoji: "🥔",
    color: "#F4A460",
  },
  {
    id: "m3",
    title: "Salmon Teriyaki",
    restaurant: "Ocean Grill",
    emoji: "🐟",
    color: "#CD5C5C",
  },
  {
    id: "m4",
    title: "Vegan Burger",
    restaurant: "Green Spot",
    emoji: "🍔",
    color: "#228B22",
  },
  {
    id: "m5",
    title: "Spicy Tofu Bowl",
    restaurant: "Zen Bistro",
    emoji: "🌶️",
    color: "#FF6347",
  },
  {
    id: "m6",
    title: "Caprese Salad",
    restaurant: "Pasta House",
    emoji: "🥗",
    color: "#98FB98",
  },
];

// --- КОМПОНЕНТ: КАРТКА ЇЖІ (ІМІТАЦІЯ АСЕТА) ---
const MealCard: React.FC<{ item: MealItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      {/* Імітація зображення за допомогою кольорового блоку та емодзі */}
      <View
        style={[styles.cardImagePlaceholder, { backgroundColor: item.color }]}
      >
        <Text style={styles.cardEmoji}>{item.emoji}</Text>
      </View>

      {/* Оверлей завжди залишається внизу, як на макеті */}
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardRestaurant}>
          {/* Іконки використовуються з бібліотеки Ionicons */}
          <Ionicons name="home-outline" size={14} color="#fff" />
          <Text style={styles.cardRestaurantText}>{item.restaurant}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- КОМПОНЕНТ: СЕКЦІЯ ЗІ СПИСКОМ ---
const MealSection: React.FC<{ title: string; data: MealItem[] }> = ({
  title,
  data,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => console.log(`Переглянути всі ${title}`)}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MealCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
};

// --- КОМПОНЕНТ: НИЖНЯ ПАНЕЛЬ НАВІГАЦІЇ (TAB BAR) ---
const TabBar: React.FC = () => {
  const tabs = [
    { name: "Home", icon: "home-outline", active: false },
    { name: "Discovery", icon: "search", active: true }, // Активна вкладка
    { name: "Chats", icon: "chatbubbles-outline", active: false },
    { name: "My Friends", icon: "people-outline", active: false },
    { name: "Profile", icon: "person-outline", active: false },
  ];

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          onPress={() => console.log(`Натиснуто: ${tab.name}`)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={tab.active ? "#E57373" : "#a0a0a0"}
          />
          <Text
            style={[
              styles.tabText,
              { color: tab.active ? "#E57373" : "#a0a0a0" },
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// --- ОСНОВНИЙ ЕКРАН DISCOVERY ---
const DiscoveryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = () => {
    console.log("Натиснуто Фільтр");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Поточна локація */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Current location</Text>
          <View style={styles.locationDetails}>
            <Ionicons name="location-sharp" size={20} color="#000" />
            <Text style={styles.locationText}>Gading Serpong, Toronto</Text>
          </View>
        </View>

        {/* Рядок пошуку */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#a0a0a0"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search anything...."
            placeholderTextColor="#a0a0a0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
            {/* Іконка фільтра */}
            <Ionicons name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Секції Рекомендацій */}
        <MealSection title="Recommended for you:" data={mockMeals} />

        <MealSection title="Gluten-Free:" data={mockMeals.slice(1, 4)} />

        {/* Додаткові секції */}
        <MealSection title="Vegetarian:" data={mockMeals.slice(0, 3)} />

        <MealSection title="Vegan:" data={mockMeals.slice(3, 6)} />

        {/* Додатковий відступ, щоб контент не перекривався Tab Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Нижня навігація */}
      <TabBar />
    </SafeAreaView>
  );
};

// --- СТИЛІ ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // --- Локація ---
  locationContainer: {
    marginBottom: 20,
  },
  locationLabel: {
    fontSize: 14,
    color: "#a0a0a0",
    fontWeight: "500",
    marginBottom: 4,
  },
  locationDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginLeft: 5,
  },

  // --- Пошук ---
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    height: 50,
    marginBottom: 25,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    height: "100%",
  },
  filterButton: {
    backgroundColor: "#E57373", // Колір кнопки фільтра
    borderRadius: 12,
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  // --- Секції контенту ---
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E57373",
  },
  horizontalList: {
    // Стилі для горизонтального прокручування
  },

  // --- Картка їжі (використання асетів) ---
  cardContainer: {
    width: 150,
    height: 220,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 15,
  },
  cardImagePlaceholder: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardEmoji: {
    fontSize: 60, // Велике емодзі замість зображення
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    // Градієнт або напівпрозорий фон для кращої читабельності тексту
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  cardRestaurant: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRestaurantText: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 3,
    fontWeight: "500",
  },

  // --- Tab Bar ---
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },
});

export default DiscoveryScreen;
