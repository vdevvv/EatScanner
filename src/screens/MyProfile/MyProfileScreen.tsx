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
  primary: "#E9725C", // Червоно-помаранчевий
  background: "#FFFFFF",
  textDark: "#1F2937", // Темний текст
  textGrey: "#6B7280", // Сірий текст
  white: "#FFFFFF",
  divider: "#E5E7EB",
};

// 💡 ЛОКАЛЬНІ ЗОБРАЖЕННЯ
// Залишаємо ваші шляхи require()
const AVATAR_SOURCE =
  require("../components/profile-avatar.jpg") as ImageSourcePropType;
const DISH_1_SOURCE =
  require("../components/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../components/potatoes-square.jpg") as ImageSourcePropType;

// Дані профілю (ВЛАСНИЙ ПРОФІЛЬ)
const USER_DATA = {
  handle: "@foodie_iryna",
  name: "Iryna Hvozdetka", // Оновлене ім'я
  stats: [
    { label: "Saved", count: 46 },
    { label: "Friends", count: 212 },
    // Тут було Shared orders та Shared videos, але на скріншоті їх немає
  ],
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

// --- ДОПОМІЖНІ КОМПОНЕНТИ ---

// Статистична картка (46 Saved, 212 Friends)
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
// Розмір елемента сітки розраховується як ширина екрана / 3
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

// --- ОСНОВНИЙ ЕКРАН ПРОФІЛЮ ---

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Хедер */}
      <View style={styles.header}>
        {/* Прибираємо кнопку "назад", залишаємо тільки для FriendProfileScreen */}
        <View style={{ width: 28 }} />
        <Text style={styles.headerTitle}>{USER_DATA.handle}</Text>
        <TouchableOpacity onPress={() => console.log("Open Settings")}>
          <Ionicons
            name="settings-outline" // Значок шестерінки
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
              {/* Додаємо порожні елементи для вирівнювання, якщо потрібно,
                  але на скріншоті лише два елементи статистики */}
              <View style={styles.statItemPlaceholder} />
              <View style={styles.statItemPlaceholder} />
            </View>
          </View>

          {/* Ім'я */}
          <Text style={styles.userName}>{USER_DATA.name}</Text>

          {/* !!! Кнопку "Send message" ВИДАЛЕНО !!! */}
        </View>
        {/* !!! Спільні друзі ВИДАЛЕНО !!! */}

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
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
        />

        {/* Додатковий простір для скролінгу */}
        <View style={{ height: 50 }} />
      </ScrollView>

      {/* Навігаційна панель (Бачимо на скріншоті, додамо для повноти) */}
      <View style={styles.bottomTabBar}>
        <TabBarItem iconName="home-outline" label="Home" active={false} />
        <TabBarItem
          iconName="search-outline"
          label="Discovery"
          active={false}
        />
        <TabBarItem
          iconName="chatbubble-outline"
          label="Chats"
          active={false}
        />
        <TabBarItem
          iconName="people-outline"
          label="My Friends"
          active={false}
        />
        <TabBarItem iconName="person" label="Profile" active={true} />
      </View>
    </SafeAreaView>
  );
};

// --- КОМПОНЕНТ ЕЛЕМЕНТА НИЖНЬОЇ ПАНЕЛІ (TabBar) ---
interface TabBarItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  active: boolean;
}

const TabBarItem: React.FC<TabBarItemProps> = ({ iconName, label, active }) => (
  <TouchableOpacity style={styles.tabBarItem}>
    <Ionicons
      name={iconName}
      size={24}
      color={active ? COLORS.primary : COLORS.textGrey}
    />
    <Text
      style={[
        styles.tabBarLabel,
        { color: active ? COLORS.primary : COLORS.textGrey },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// --- СТИЛІЗАЦІЯ ---

const PADDING_HORIZONTAL = 20;
const AVATAR_SIZE = 80;

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
    borderBottomWidth: 1, // Розділювач, який був присутній
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
    borderColor: COLORS.divider,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    // Залишимо простір для 4 елементів, як було раніше,
    // але заповнимо лише двома, щоб зберегти вирівнювання
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  statItemPlaceholder: {
    flex: 1, // Для симетричного розміщення двох активних елементів
    marginHorizontal: 5,
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
    fontSize: 20, // Трохи менше, ніж на профілі друга
    fontWeight: "500", // Менш жирний, ніж на профілі друга
    color: COLORS.textDark,
    marginBottom: 20, // Великий відступ, оскільки немає кнопки "Send message"
    paddingTop: 5, // Трохи опустити від аватара
  },

  // --- Сітка замовлень ---
  pastOrdersHeader: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 15,
  },
  pastOrdersTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
    textAlign: "center", // Центрування заголовка
  },
  columnWrapper: {
    justifyContent: "flex-start", // Початок зліва
  },
  orderItemContainer: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.5,
    padding: 1,
  },
  orderImage: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 0,
  },
  orderTextOverlay: {
    padding: 8,
    // Змінимо фон, щоб він був менш помітним на вашому скріншоті
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  orderDishName: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark, // Темний текст на світлому фоні
  },
  orderRestaurantName: {
    fontSize: 10,
    color: COLORS.textGrey,
  },

  // --- Нижня навігаційна панель (TabBar) ---
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarItem: {
    alignItems: "center",
    flex: 1,
  },
  tabBarLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: "500",
  },
});

export default ProfileScreen;
