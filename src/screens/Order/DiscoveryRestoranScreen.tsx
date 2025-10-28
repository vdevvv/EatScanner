import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type RootStackParamList = {
  HomePageScreen: undefined;
  DiscoveryRestoranScreen: undefined;
  DiscoveryRestoranOrderScreen: undefined;
  FriendsProfileFriends: undefined;
  MyProfileScreen: undefined;
};

type DiscoveryRestoranNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DiscoveryRestoranScreen"
>;

const MAIN_IMAGE = require("../../assets/dumplings-top.jpg");
const SUSHI_IMAGE = require("../../assets/sushi-dragons.jpg");
const POTATOES_IMAGE = require("../../assets/potato-green.jpg");
const PASTA_SMALL_IMAGE = require("../../assets/pasta.jpg");

const { width } = Dimensions.get("window");

// --- Дані ---
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
      "Tomato sauce, smoked pork neck, red onions, pecorino cheese, chilli.",
    price: 45,
    image: PASTA_SMALL_IMAGE,
  },
  {
    id: 2,
    name: "Carbonara pasta",
    description:
      "Eggs, pancetta, pecorino romano, and black pepper — classic Italian flavor.",
    price: 48,
    image: PASTA_SMALL_IMAGE,
  },
  {
    id: 3,
    name: "Arrabbiata pasta",
    description:
      "Spicy tomato sauce with garlic, chili, and extra virgin olive oil.",
    price: 42,
    image: PASTA_SMALL_IMAGE,
  },
  {
    id: 4,
    name: "Pomodoro pasta",
    description:
      "Fresh tomato sauce, basil, and parmesan cheese — light and authentic.",
    price: 40,
    image: PASTA_SMALL_IMAGE,
  },
];

// --- Компоненти ---
const RatingPill: React.FC<{
  iconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap;
  text: string;
  color: string;
  isMaterial?: boolean;
}> = ({ iconName, text, color, isMaterial = false }) => (
  <View style={styles.ratingPillContainer}>
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

const MenuItemCard: React.FC<{
  item: MenuItem;
  onPress: (item: MenuItem) => void;
}> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.menuItemCard} onPress={() => onPress(item)}>
    <Image source={item.image} style={styles.menuItemImage} />
    <View style={styles.menuItemTextContainer}>
      <Text style={styles.menuItemTitle}>{item.name}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <Text style={styles.menuItemPrice}>AED {item.price}</Text>
    </View>
  </TouchableOpacity>
);

// --- Компонент нижньої панелі ---
const TabBarItem = ({
  iconName,
  label,
  onPress,
  active = false,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  active?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tabItem, active && styles.tabItemActive]}
  >
    <Ionicons
      name={iconName}
      size={22}
      color={active ? "#E57373" : "#999"}
      style={{ marginBottom: 2 }}
    />
    <Text
      style={[styles.tabLabel, { color: active ? "#E57373" : "#999" }]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// --- Головний екран ---
const DiscoveryRestoranScreen: React.FC = () => {
  const navigation = useNavigation<DiscoveryRestoranNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    navigation.navigate("HomePageScreen");
  };

  const handleMenuItemPress = (item: MenuItem) => {
    navigation.navigate("DiscoveryRestoranOrderScreen");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Верхній банер */}
      <ImageBackground source={MAIN_IMAGE} style={styles.headerImageBackground}>
        <View style={[styles.headerContentOverlay, { paddingTop: insets.top }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {/* Інфо ресторану */}
        <View style={styles.infoBlock}>
          <Text style={styles.restaurantTitle}>La Pasta House</Text>
          <Text style={styles.restaurantSubtitle}>
            An authentic Italian touch and delicious!
          </Text>

          <View style={styles.ratingsContainer}>
            <RatingPill
              iconName="star"
              text="Trustpilot 4.3"
              color="#4CAF50"
              isMaterial
            />
            <RatingPill
              iconName="star"
              text="Google 4.0"
              color="#3f84f8"
              isMaterial
            />
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#888" />
            <Text style={styles.locationText}>Dubai</Text>
            <Text style={styles.distanceText}>3 miles away</Text>
          </View>
        </View>

        {/* Виділені страви */}
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

        {/* Меню */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <View style={styles.filterContainer}>
            <MenuFilterButton icon="🍴" label="Mains" isActive />
            <MenuFilterButton icon="🍰" label="Dessert" isActive={false} />
            <MenuFilterButton icon="🥤" label="Drink" isActive={false} />
          </View>

          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onPress={handleMenuItemPress}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Нижня панель навігації */}
      <View style={styles.bottomTabBar}>
        <TabBarItem
          iconName="home-outline"
          label="Home"
          onPress={() => navigation.navigate("HomePageScreen")}
        />
        <TabBarItem
          iconName="search-outline"
          label="Discovery"
          active
          onPress={() => navigation.navigate("DiscoveryRestoranScreen")}
        />
        <TabBarItem
          iconName="people-outline"
          label="My Friends"
          onPress={() => navigation.navigate("FriendsProfileFriends")}
        />
        <TabBarItem
          iconName="person-outline"
          label="Profile"
          onPress={() => navigation.navigate("MyProfileScreen")}
        />
      </View>
    </View>
  );
};

// --- Стилі ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImageBackground: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
  },
  headerContentOverlay: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 10,
    minHeight: 50,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 5,
  },
  scrollViewContentContainer: { paddingTop: 250 },
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
  restaurantTitle: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  restaurantSubtitle: { fontSize: 14, color: "#888", marginBottom: 10 },
  ratingsContainer: { flexDirection: "row", marginBottom: 8 },
  ratingPillContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  ratingIconWrapper: {
    padding: 4,
    borderRadius: 15,
    marginRight: 4,
  },
  ratingPillText: { color: "#333", fontSize: 12, fontWeight: "600" },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationText: { fontSize: 14, color: "#333", marginLeft: 4 },
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
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
  viewAllText: { fontSize: 14, color: "#E57373", fontWeight: "600" },
  highlightedScroll: { paddingBottom: 20 },
  highlightedCard: {
    width: width * 0.45,
    height: width * 0.6,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  highlightedImage: { width: "100%", height: "100%", resizeMode: "cover" },
  highlightedTextOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  highlightedTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  highlightedSubtitle: { color: "#eee", fontSize: 12 },
  menuSection: { paddingHorizontal: 20, paddingBottom: 80, marginTop: 10 },
  filterContainer: { flexDirection: "row", marginVertical: 15 },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  filterButtonActive: { backgroundColor: "#FBE6E3" },
  filterIcon: { fontSize: 18, marginRight: 5 },
  filterLabel: { fontSize: 14, fontWeight: "500", color: "#666" },
  filterLabelActive: { color: "#E57373", fontWeight: "700" },
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
  menuItemTextContainer: { flex: 1 },
  menuItemTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  menuItemDescription: { fontSize: 13, color: "#888", marginVertical: 3 },
  menuItemPrice: { fontSize: 16, fontWeight: "700", color: "#E57373" },

  // --- Нижня навігація ---
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabItemActive: {},
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  menuList: {}
});

export default DiscoveryRestoranScreen;
