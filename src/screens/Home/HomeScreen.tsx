// src/screens/Discovery/DiscoveryScreen.tsx
import React, { useState, useMemo } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// --- Типи для навігації ---
type RootStackParamList = {
  HomePageScreen: undefined;
  Discovery: undefined;
  DiscoveryFiltersPage: undefined;
  DiscoveryRestoranWhere: undefined; // 👈 нова сторінка
  DiscoveryRestoranScreen: undefined; // 👈 нова сторінка
  ChatsScreen: undefined;
  FriendsProfileFriends: undefined;
  MyProfileScreen: undefined;
};

// --- ІНТЕРФЕЙС ---
interface MealItem {
  id: string;
  title: string;
  restaurant: string;
  image: any;
  price: string;
}

// --- ЛОКАЛЬНІ ДАНІ ---
const mockMeals: MealItem[] = [
  {
    id: "m1",
    title: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: require("../../assets/sushi-roll.png"),
    price: "AED 45",
  },
  {
    id: "m2",
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: require("../../assets/potato.png"),
    price: "AED 30",
  },
  {
    id: "m3",
    title: "Salmon Teriyaki",
    restaurant: "Ocean Grill",
    image: require("../../assets/potato.png"),
    price: "AED 55",
  },
  {
    id: "m4",
    title: "Vegan Burger",
    restaurant: "Green Spot",
    image: require("../../assets/sushi-roll.png"),
    price: "AED 38",
  },
];

// --- ГОЛОВНИЙ ЕКРАН ---
type DiscoveryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Discovery"
>;

const DiscoveryScreen: React.FC = () => {
  const navigation = useNavigation<DiscoveryNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  // --- Навігація ---
  const handleViewAllPress = () =>
    navigation.navigate("DiscoveryRestoranWhere");
  const handleOrderNowPress = () =>
    navigation.navigate("DiscoveryRestoranScreen");

  const handleHomePress = () => navigation.navigate("HomePageScreen");
  const handleDiscoveryPress = () => {};
  const handleChatsPress = () => navigation.navigate("ChatsScreen");
  const handleFriendsPress = () => navigation.navigate("FriendsProfileFriends");
  const handleProfilePress = () => navigation.navigate("MyProfileScreen");
  const handleFiltersPress = () => navigation.navigate("DiscoveryFiltersPage");

  // --- Фільтрація ---
  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return mockMeals;
    return mockMeals.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // --- КАРТКА СТРАВИ ---
  const MealCard: React.FC<{ item: MealItem }> = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardRestaurant}>
          <Ionicons name="home-outline" size={14} color="#fff" />
          <Text style={styles.cardRestaurantText}>{item.restaurant}</Text>
        </View>

        {/* Кнопка Order Now */}
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handleOrderNowPress}
        >
          <Text style={styles.orderButtonText}>Order Now | {item.price}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- СЕКЦІЯ ---
  const MealSection: React.FC<{ title: string; data: MealItem[] }> = ({
    title,
    data,
  }) => {
    if (data.length === 0) return null;
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity onPress={handleViewAllPress}>
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

  // --- ТАБ-БАР ---
  const TabBar: React.FC = () => {
    const tabs = [
      { name: "Home", icon: "home-outline", onPress: handleHomePress },
      {
        name: "Discovery",
        icon: "search-outline",
        onPress: handleDiscoveryPress,
        active: true,
      },
      { name: "Chats", icon: "chatbubble-outline", onPress: handleChatsPress },
      { name: "Friends", icon: "people-outline", onPress: handleFriendsPress },
      { name: "Profile", icon: "person-outline", onPress: handleProfilePress },
    ];

    return (
      <View style={styles.tabBarContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={tab.onPress}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={tab.active ? "#E9725C" : "#999"}
            />
            <Text
              style={[
                styles.tabText,
                { color: tab.active ? "#E9725C" : "#999" },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleFiltersPress}
          >
            <Ionicons name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Секції */}
        <MealSection title="Recommended for you:" data={filteredMeals} />
        <MealSection title="Gluten-Free:" data={filteredMeals.slice(1, 4)} />
        <MealSection title="Vegetarian:" data={filteredMeals.slice(0, 3)} />
        <MealSection title="Vegan:" data={filteredMeals.slice(3, 6)} />

        <View style={{ height: 100 }} />
      </ScrollView>

      <TabBar />
    </SafeAreaView>
  );
};

export default DiscoveryScreen;

// --- СТИЛІ ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  locationContainer: { marginBottom: 20 },
  locationLabel: {
    fontSize: 14,
    color: "#a0a0a0",
    fontWeight: "500",
    marginBottom: 4,
  },
  locationDetails: { flexDirection: "row", alignItems: "center" },
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
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: "#000" },
  filterButton: {
    backgroundColor: "#E57373",
    borderRadius: 12,
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  sectionContainer: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#000" },
  viewAllText: { fontSize: 16, fontWeight: "600", color: "#E57373" },

  cardContainer: {
    width: 160,
    height: 230,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 15,
    backgroundColor: "#ddd",
  },
  cardImage: { width: "100%", height: "100%" },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 10,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#fff" },
  cardRestaurant: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  cardRestaurantText: { fontSize: 12, color: "#fff", marginLeft: 3 },

  orderButton: {
    backgroundColor: "#E9725C",
    borderRadius: 10,
    marginTop: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  orderButtonText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    height: 80,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: { alignItems: "center", flex: 1 },
  tabText: { fontSize: 10, marginTop: 2, fontWeight: "500" },
});
