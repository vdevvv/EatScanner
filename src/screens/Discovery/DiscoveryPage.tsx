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
  Image,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- ІНТЕРФЕЙС ДАНИХ ---
interface MealItem {
  id: string;
  title: string;
  restaurant: string;
  image: any;
}

// --- МАСИВ СТРАВ ІЗ ЛОКАЛЬНИМИ АСЕТАМИ ---
const mockMeals: MealItem[] = [
  {
    id: "m1",
    title: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: require("../../assets/sushi-roll.png"),
  },
  {
    id: "m2",
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: require("../../assets/potato.png"),
  },
  {
    id: "m3",
    title: "Salmon Teriyaki",
    restaurant: "Ocean Grill",
    image: require("../../assets/potato.png"),
  },
  {
    id: "m4",
    title: "Vegan Burger",
    restaurant: "Green Spot",
    image: require("../../assets/sushi-roll.png"),
  },
  {
    id: "m5",
    title: "Spicy Tofu Bowl",
    restaurant: "Zen Bistro",
    image: require("../../assets/potato.png"),
  },
  {
    id: "m6",
    title: "Caprese Salad",
    restaurant: "Pasta House",
    image: require("../../assets/sushi-roll.png"),
  },
];

// --- КАРТКА СТРАВИ ---
const MealCard: React.FC<{ item: MealItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardRestaurant}>
          <Ionicons name="home-outline" size={14} color="#fff" />
          <Text style={styles.cardRestaurantText}>{item.restaurant}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- СЕКЦІЯ СТРАВ ---
const MealSection: React.FC<{ title: string; data: MealItem[] }> = ({
  title,
  data,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={() => console.log(`View all ${title}`)}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MealCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 10 }}
      />
    </View>
  );
};

// --- НИЖНЯ ПАНЕЛЬ НАВІГАЦІЇ ---
const TabBar: React.FC = () => {
  const tabs = [
    { name: "Home", icon: "home-outline", active: false },
    { name: "Discovery", icon: "search", active: true },
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
          onPress={() => console.log(`Pressed: ${tab.name}`)}
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

// --- ГОЛОВНИЙ ЕКРАН ---
const DiscoveryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Локація */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Current location</Text>
          <View style={styles.locationDetails}>
            <Ionicons name="location-sharp" size={20} color="#000" />
            <Text style={styles.locationText}>Gading Serpong, Toronto</Text>
          </View>
        </View>

        {/* Пошук */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#a0a0a0"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search anything..."
            placeholderTextColor="#a0a0a0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Секції */}
        <MealSection title="Recommended for you:" data={mockMeals} />
        <MealSection title="Gluten-Free:" data={mockMeals.slice(1, 4)} />
        <MealSection title="Vegetarian:" data={mockMeals.slice(0, 3)} />
        <MealSection title="Vegan:" data={mockMeals.slice(3, 6)} />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Нижня панель */}
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
  },
  filterButton: {
    backgroundColor: "#E57373",
    borderRadius: 12,
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

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

  cardContainer: {
    width: 150,
    height: 220,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 15,
    backgroundColor: "#ddd",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  cardRestaurant: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  cardRestaurantText: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 3,
  },

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
