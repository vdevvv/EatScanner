import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  HomePageScreen: undefined;
  Discovery: undefined;
  FriendsScreen: undefined;
  FriendsProfileFriends: undefined;
  ProfileScreen: undefined;
  MyProfileScreen: undefined;
  MyProfileSettings: undefined;
  MyProfileSaved: undefined;
  DishDetailScreen: undefined;
  OrderScreen: undefined;
  SavedScreen: undefined;
};

const { width } = Dimensions.get("window");
const COLORS = {
  primary: "#E9725C",
  background: "#FFFFFF",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  white: "#FFFFFF",
  divider: "#E5E7EB",
};

const AVATAR_SOURCE =
  require("../../assets/profile-avatar.jpg") as ImageSourcePropType;
const DISH_1_SOURCE =
  require("../../assets/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../../assets/potatoes-square.jpg") as ImageSourcePropType;

const USER_DATA = {
  handle: "@foodie_iryna",
  name: "Iryna Hvozdetka",
  stats: [
    { label: "Saved", count: 46 },
    { label: "Friends", count: 212 },
  ],
  avatar: AVATAR_SOURCE,
};

const PAST_ORDERS_DATA = [
  {
    id: "1",
    image: DISH_1_SOURCE,
    title: "Sushi Dragons",
    restaurant: "Yoshi House",
  },
  {
    id: "2",
    image: DISH_2_SOURCE,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
  {
    id: "3",
    image: DISH_1_SOURCE,
    title: "Sushi Dragons",
    restaurant: "Yoshi House",
  },
  {
    id: "4",
    image: DISH_2_SOURCE,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
  {
    id: "5",
    image: DISH_1_SOURCE,
    title: "Sushi Dragons",
    restaurant: "Yoshi House",
  },
  {
    id: "6",
    image: DISH_2_SOURCE,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
];

type MyProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyProfileScreen"
>;

interface StatItemProps {
  count: number;
  label: string;
  onPress?: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ count, label, onPress }) => (
  <TouchableOpacity style={styles.statItem} onPress={onPress}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

interface OrderItemProps {
  image: ImageSourcePropType;
  title: string;
  restaurant: string;
}

const GRID_ITEM_SIZE = width / 3;

const OrderItem: React.FC<OrderItemProps> = ({ image, title, restaurant }) => (
  <TouchableOpacity style={styles.orderItemContainer} activeOpacity={0.8}>
    <ImageBackground
      source={image}
      style={styles.orderImage}
      resizeMode="cover"
      imageStyle={{ borderRadius: 8 }}
    >
      <View style={styles.overlay} />
      <View style={styles.orderTextContainer}>
        <Text style={styles.orderTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.restaurantRow}>
          <Ionicons
            name="home-outline"
            size={12}
            color={COLORS.white}
            style={{ marginRight: 3 }}
          />
          <Text style={styles.orderRestaurant} numberOfLines={1}>
            {restaurant}
          </Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const MyProfileScreen = () => {
  const navigation = useNavigation<MyProfileNavigationProp>();

  const handleSettingsPress = () => navigation.navigate("MyProfileSettings");
  const handleSavedPress = () => navigation.navigate("MyProfileSaved");
  const handleFriendsListPress = () => navigation.navigate("FriendsScreen");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={{ width: 28 }} />
        <Text style={styles.headerTitle}>{USER_DATA.handle}</Text>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileBlock}>
          <View style={styles.topRow}>
            <Image source={USER_DATA.avatar} style={styles.avatar} />

            <View style={styles.statsContainer}>
              <StatItem
                count={USER_DATA.stats[0].count}
                label="Saved"
                onPress={handleSavedPress}
              />
              <StatItem
                count={USER_DATA.stats[1].count}
                label="Friends"
                onPress={handleFriendsListPress}
              />
              <View style={styles.statItemPlaceholder} />
              <View style={styles.statItemPlaceholder} />
            </View>
          </View>

          <Text style={styles.userName}>{USER_DATA.name}</Text>
        </View>

        <View style={styles.pastOrdersHeader}>
          <Text style={styles.pastOrdersTitle}>Past Orders</Text>
        </View>

        <FlatList
          data={PAST_ORDERS_DATA}
          renderItem={({ item }) => (
            <OrderItem
              image={item.image}
              title={item.title}
              restaurant={item.restaurant}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
        />

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const PADDING_HORIZONTAL = 20;
const AVATAR_SIZE = 80;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: COLORS.textDark },
  profileBlock: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 20,
    borderWidth: 2,
    borderColor: COLORS.divider,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: { alignItems: "center", flex: 1, marginHorizontal: 5 },
  statItemPlaceholder: { flex: 1, marginHorizontal: 5 },
  statCount: { fontSize: 20, fontWeight: "bold", color: COLORS.textDark },
  statLabel: { fontSize: 12, color: COLORS.textGrey, textAlign: "center" },
  userName: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.textDark,
    marginBottom: 20,
    paddingTop: 5,
  },
  pastOrdersHeader: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 15,
  },
  pastOrdersTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
    textAlign: "center",
  },
  columnWrapper: { justifyContent: "flex-start" },
  orderItemContainer: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.5,
    padding: 2,
  },
  orderImage: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
  },
  orderTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  orderTitle: { color: COLORS.white, fontSize: 12, fontWeight: "600" },
  restaurantRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  orderRestaurant: {
    color: COLORS.white,
    fontSize: 10,
    opacity: 0.9,
  },
});

export default MyProfileScreen;
