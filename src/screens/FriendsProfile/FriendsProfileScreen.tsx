import React from "react";
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
  FlatList,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- КОНФІГУРАЦІЯ ТА ДАНІ ---
const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C", // Червоно-помаранчевий для кнопки "Send message"
  background: "#FFFFFF",
  textDark: "#1F2937", // Темний текст
  textGrey: "#6B7280", // Сірий текст
  white: "#FFFFFF",
  divider: "#E5E7EB",
};

// 💡 ЛОКАЛЬНІ ЗОБРАЖЕННЯ
// Залишаємо ваші шляхи require(), як ви просили.
// Примітка: ці файли мають існувати за вказаними шляхами!

const AVATAR_SOURCE =
  require("../components/profile-avatar.jpg") as ImageSourcePropType;
const DISH_1_SOURCE =
  require("../components/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../components/potatoes-square.jpg") as ImageSourcePropType;
const FRIEND_1_SOURCE =
  require("../components/friend1.jpg") as ImageSourcePropType;
const FRIEND_2_SOURCE =
  require("../components/friend2.jpg") as ImageSourcePropType;
const FRIEND_3_SOURCE =
  require("../components/friend3.jpg") as ImageSourcePropType;
const FRIEND_4_SOURCE =
  require("../components/friend4.jpg") as ImageSourcePropType;

// Дані профілю
const USER_DATA = {
  handle: "@foodie_iryna",
  name: "Talia Gomez",
  stats: [
    { label: "Saved", count: 46 },
    { label: "Friends", count: 212 },
    { label: "Shared orders", count: 212 },
    { label: "Shared videos", count: 212 },
  ],
  mutualFriendsCount: 40,
  avatar: AVATAR_SOURCE,
};

// Імітація даних для розділу "Past Orders" (Сітка)
const PAST_ORDERS_DATA = [
  {
    id: "1",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "2",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
  {
    id: "3",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "4",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
  {
    id: "5",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "6",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
];

// Імітація аватарів спільних друзів
// Додано більше друзів для демонстрації скролу
const MUTUAL_FRIENDS = [
  { id: "m1", avatar: FRIEND_1_SOURCE, name: "Max" },
  { id: "m2", avatar: FRIEND_2_SOURCE, name: "Anna" },
  { id: "m3", avatar: FRIEND_3_SOURCE, name: "Tom" },
  { id: "m4", avatar: FRIEND_4_SOURCE, name: "Ira" },
  { id: "m5", avatar: FRIEND_1_SOURCE, name: "Lena" },
  { id: "m6", avatar: FRIEND_2_SOURCE, name: "Nick" },
  { id: "m7", avatar: FRIEND_3_SOURCE, name: "Eva" },
  { id: "m8", avatar: FRIEND_4_SOURCE, name: "Sasha" },
];

// --- ДОПОМІЖНІ КОМПОНЕНТИ ---

// Статистична картка (46 Saved, 212 Friends, ...)
interface StatItemProps {
  count: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ count, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// Елемент сітки "Past Orders"
const GRID_ITEM_SIZE = width / 3;

interface OrderItemProps {
  dishName: string;
  restaurant: string;
  image: ImageSourcePropType;
}

const OrderItem: React.FC<OrderItemProps> = ({
  dishName,
  restaurant,
  image,
}) => (
  <TouchableOpacity style={styles.orderItemContainer}>
    <ImageBackground
      source={image}
      style={styles.orderImage}
      resizeMode="cover"
    >
      <View style={styles.orderTextOverlay}>
        <Text style={styles.orderDishName}>{dishName}</Text>
        <Text style={styles.orderRestaurantName}>{restaurant}</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

// --- ОСНОВНИЙ ЕКРАН ---

const UserProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Хедер */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Go Back")}>
          <Ionicons name="chevron-back" size={28} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{USER_DATA.handle}</Text>
        <TouchableOpacity onPress={() => console.log("More Options")}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Блок Профілю */}
        <View style={styles.profileBlock}>
          <View style={styles.topRow}>
            {/* Аватар */}
            <Image source={USER_DATA.avatar} style={styles.avatar} />

            {/* Статистика */}
            <View style={styles.statsContainer}>
              {USER_DATA.stats.map((stat, index) => (
                <StatItem key={index} count={stat.count} label={stat.label} />
              ))}
            </View>
          </View>

          {/* Ім'я */}
          <Text style={styles.userName}>{USER_DATA.name}</Text>

          {/* Кнопка "Send message" */}
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() => console.log("Send Message")}
          >
            <Text style={styles.messageButtonText}>Send message</Text>
          </TouchableOpacity>
        </View>

        {/* Спільні друзі (Горизонтальний скрол) */}
        <View style={styles.friendsBlockWrapper}>
          <Text style={styles.mutualFriendsText}>
            <Text style={{ fontWeight: "bold" }}>
              {USER_DATA.mutualFriendsCount}
            </Text>{" "}
            Mutual Friends
          </Text>

          {/* ✅ ВИПРАВЛЕНО: Горизонтальний скрол */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsAvatarsScroll}
          >
            {MUTUAL_FRIENDS.map((friend) => (
              <View key={friend.id} style={styles.friendPill}>
                <Image source={friend.avatar} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{friend.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Розділювач та Заголовок "Past Orders" */}
        <View style={styles.pastOrdersHeader}>
          <Text style={styles.pastOrdersTitle}>Past Orders</Text>
        </View>

        {/* Сітка замовлень */}
        <FlatList
          data={PAST_ORDERS_DATA}
          renderItem={({ item }) => (
            <OrderItem
              dishName={item.dishName}
              restaurant={item.restaurant}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false} // Нехай ScrollView обробляє скролінг
          columnWrapperStyle={styles.columnWrapper}
        />

        {/* Додатковий простір для скролінгу */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- СТИЛІЗАЦІЯ ---

const PADDING_HORIZONTAL = 20;
const AVATAR_SIZE = 80;
const FRIEND_AVATAR_SIZE = 50; // Розмір для скролу

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // --- Хедер (Навігаційна панель) ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
  },

  // --- Блок Профілю ---
  profileBlock: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 20,
    borderWidth: 2,
    borderColor: COLORS.divider, // Невеликий обідок навколо аватара
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1, // Розподіл простору між статистичними даними
  },
  statCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textGrey,
    textAlign: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 15,
  },
  messageButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },

  // --- Спільні друзі (Горизонтальний скрол) ---
  friendsBlockWrapper: {
    // Контейнер, який містить заголовок і скрол
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    marginBottom: 10,
  },
  mutualFriendsText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: "500",
    marginBottom: 10,
    paddingHorizontal: PADDING_HORIZONTAL, // Відступ для заголовка
  },
  friendsAvatarsScroll: {
    paddingHorizontal: PADDING_HORIZONTAL, // Відступ для початку та кінця скролу
    paddingBottom: 15,
  },
  friendPill: {
    alignItems: "center",
    marginRight: 15, // Відступ між елементами друзів
    width: 70, // Фіксована ширина для кожного елемента (аватар + ім'я)
  },
  friendAvatar: {
    width: FRIEND_AVATAR_SIZE,
    height: FRIEND_AVATAR_SIZE,
    borderRadius: FRIEND_AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.divider,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 12,
    color: COLORS.textGrey,
    textAlign: "center",
    maxWidth: FRIEND_AVATAR_SIZE + 10,
  },
  // --- Сітка замовлень ---
  pastOrdersHeader: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  pastOrdersTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: "flex-start",
  },
  orderItemContainer: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.5, // Приблизно 2:3 співвідношення сторін для вертикальних зображень
    padding: 1, // Невеликий простір між плитками
  },
  orderImage: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 0,
  },
  orderTextOverlay: {
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  orderDishName: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.white,
  },
  orderRestaurantName: {
    fontSize: 10,
    color: COLORS.white,
  },
});

export default UserProfileScreen;
