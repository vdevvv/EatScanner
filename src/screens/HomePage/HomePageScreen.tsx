import React, { useState, useRef } from "react";
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
  ScrollView,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи для навігації
type RootStackParamList = {
  HomePageScreen: undefined;
  Discovery: undefined;
  ChatsScreen: undefined;
  FriendsScreen: undefined;
  FriendsProfileFriends: undefined;
  FriendsProfileScreen: undefined;
  ProfileScreen: undefined;
  MyProfileScreen: undefined;
  DishDetailScreen: undefined;
  Order: undefined;
  Notifications: undefined;
};

const images = [
  require("../../assets/potato-green.jpg"),
  require("../../assets/food1.jpg"),
  require("../../assets/food2.jpg"),
  require("../../assets/food3.jpg"),
  require("../../assets/food4.jpg"),
  require("../../assets/food5.jpg"),
  require("../../assets/food6.jpg"),
  require("../../assets/food7.jpg"),
  require("../../assets/food8.jpg"),
  require("../../assets/food9.jpg"),
  require("../../assets/dumplings-top.jpg"),
  require("../../assets/pasta.jpg"),
  require("../../assets/pasta copy.jpg"),
  require("../../assets/potatoes-square.jpg"),
  require("../../assets/sushi-dragons.jpg"),
];

const shareIcon = require("../../assets/Telegram.png");
const saveIcon = require("../../assets/Save.png");
const saveIconRed = require("../../assets/Save-red.png"); // 🔴 Червона іконка

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  secondary: "#A8574B",
  white: "#FFFFFF",
  text: "#333333",
  textGrey: "#999",
  shadow: "rgba(0, 0, 0, 0.4)",
  background: "#F8F8F8",
};

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

const DISH_DATA: DishData[] = [
  {
    title: "Herbed Golden Potatoes",
    restaurant: "Love Restaurant",
    location: "Dubai",
    distance: "3 miles away",
    rating: 5.0,
    userRating: 4.8,
    price: 45,
    imageSource: images[0],
  },

  {
    title: "Beef Steak",
    restaurant: "Steak House",
    location: "Marina Walk",
    distance: "3.5 miles away",
    rating: 4.8,
    userRating: 4.6,
    price: 65,
    imageSource: images[6],
  },
  {
    title: "Fish & Chips",
    restaurant: "Ocean View",
    location: "Beach Road",
    distance: "6 miles away",
    rating: 4.4,
    userRating: 4.2,
    price: 38,
    imageSource: images[7],
  },
  {
    title: "Vegetarian Bowl",
    restaurant: "Healthy Choice",
    location: "Business Bay",
    distance: "2 miles away",
    rating: 4.6,
    userRating: 4.4,
    price: 32,
    imageSource: images[8],
  },
];

const PEOPLE_DATA = [
  {
    id: "1",
    name: "Hugo Collins",
    avatarImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    appIcon: "logo-messenger",
  },
  {
    id: "2",
    name: "Laura Scott",
    avatarImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    appIcon: "logo-whatsapp",
  },
  {
    id: "3",
    name: "Anne Frank",
    avatarImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    appIcon: "logo-whatsapp",
  },
];

const APP_SHARE_DATA = [
  { id: "1", name: "Message", icon: "chatbubble-outline", color: "#007AFF" },
  { id: "2", name: "Mail", icon: "mail-outline", color: "#007AFF" },
  { id: "3", name: "Messenger", icon: "logo-messenger", color: "#0078FF" },
  { id: "4", name: "Whatsapp", icon: "logo-whatsapp", color: "#25D366" },
  { id: "5", name: "Twitter", icon: "logo-twitter", color: "#1DA1F2" },
  { id: "6", name: "Facebook", icon: "logo-facebook", color: "#4267B2" },
  { id: "7", name: "Instagram", icon: "logo-instagram", color: "#C13584" },
  { id: "8", name: "Snapchat", icon: "logo-snapchat", color: "#FFFC00" },
];

type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePageScreen"
>;

const HomePageScreen: React.FC = () => {
  const navigation = useNavigation<HomePageNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const [savedDishes, setSavedDishes] = useState<number[]>([]); // ✅ Для позначення збережених
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / screenHeight);
    setCurrentIndex(index);
  };

  const toggleSaveDish = (index: number) => {
    setSavedDishes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Навігаційні функції
  const handleHomePress = () => {
    // Вже на HomePageScreen
    console.log("Home pressed");
  };

  const handleDiscoveryPress = () => {
    navigation.navigate("Discovery");
  };

  const handleChatsPress = () => {
    navigation.navigate("ChatsScreen");
  };

  const handleFriendsPress = () => {
    navigation.navigate("FriendsProfileFriends");
  };

  const handleProfilePress = () => {
    navigation.navigate("MyProfileScreen");
  };

  const handleViewDishPress = () => {
    navigation.navigate("DishDetailScreen");
  };

  const handleOrderNowPress = () => {
    navigation.navigate("Order");
  };

  const handleNotificationsPress = () => {
    navigation.navigate("Notifications");
  };

  const renderDishCard = (dish: DishData, index: number) => {
    const isSaved = savedDishes.includes(index);

    return (
      <View key={index} style={styles.cardContainer}>
        <ImageBackground
          source={dish.imageSource}
          style={styles.imageBackground}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.darkOverlay} />
          <LinearGradient
            colors={["transparent", "transparent", COLORS.shadow]}
            style={styles.bottomGradient}
          />

          <View style={styles.contentWrapper}>
            <Text style={styles.dishTitle}>{dish.title}</Text>

            <View style={styles.sideIcons}>
              <TouchableOpacity
                style={styles.sideIconItem}
                onPress={() => setShareMenuVisible(true)}
              >
                <Image source={shareIcon} style={styles.sideIconImage} />
              </TouchableOpacity>

              {/* ❤️ Кнопка Save */}
              <TouchableOpacity
                style={styles.sideIconItem}
                onPress={() => toggleSaveDish(index)}
              >
                <Image source={isSaved ? saveIconRed : saveIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.restaurantTitle}>{dish.restaurant}</Text>

            <View style={styles.metaRow}>
              <Ionicons
                name="location-sharp"
                size={16}
                color={COLORS.primary}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.metaText}>{dish.location}</Text>
              <Text style={styles.metaTextDivider}>•</Text>
              <Text style={styles.metaText}>{dish.distance}</Text>
            </View>

            {/* ⭐ Рейтинг */}
            <View style={styles.ratingRow}>
              <View style={styles.ratingBoxTransparent}>
                <Ionicons name="star" size={14} color="#34A853" />
                <Text style={styles.ratingTextDark}>{dish.rating} Rating</Text>
              </View>

              <View style={styles.ratingBoxTransparent}>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                  }}
                  style={styles.googleLogo}
                />
                <Text style={styles.ratingTextDark}>
                  {dish.userRating} Rating
                </Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.viewDishButton]}
                onPress={handleViewDishPress}
              >
                <Text style={styles.viewDishText}>View Dish</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.orderNowButton]}
                onPress={handleOrderNowPress}
              >
                <Text style={styles.orderNowText}>
                  Order Now | AED {dish.price}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <SafeAreaView style={styles.headerFixed}>
        <View style={styles.topProgressWrapper}>
          <View style={styles.topProgressContainer}>
            {DISH_DATA.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.topProgressBar,
                  currentIndex === i && styles.topActiveBar,
                ]}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleNotificationsPress}
        >
          <Ionicons
            name="notifications-outline"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {DISH_DATA.map((dish, index) => renderDishCard(dish, index))}
      </ScrollView>

      {/* 📤 Модальне вікно Share */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShareMenuVisible}
        onRequestClose={() => setShareMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.shareMenuOverlay}
          activeOpacity={1}
          onPress={() => setShareMenuVisible(false)}
        >
          <View style={styles.shareMenuContainer}>
            {/* Заголовок меню */}
            <View style={styles.shareMenuHeader}>
              <View style={styles.eatScannerLogo}>
                <Text style={styles.eatText}>eat</Text>
                <Ionicons
                  name="scan-outline"
                  size={20}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.shareMenuHeaderContent}>
                <Text style={styles.shareMenuTitle}>Fruit Pancake-A Mano</Text>
                <Text style={styles.shareMenuUrl}>Eatscanner.com</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShareMenuVisible(false)}
                style={styles.shareMenuCloseButton}
              >
                <Ionicons name="close" size={24} color="#888" />
              </TouchableOpacity>
            </View>

            {/* Рядок профілів */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.shareMenuPeopleScroll}
            >
              {PEOPLE_DATA.map((person) => (
                <View key={person.id} style={styles.personItem}>
                  <View style={styles.personAvatar}>
                    <Image
                      source={{ uri: person.avatarImage }}
                      style={styles.personAvatarImage}
                    />
                  </View>
                  <View style={styles.personAppIcon}>
                    <Ionicons
                      name={person.appIcon as any}
                      size={16}
                      color={COLORS.white}
                    />
                  </View>
                  <Text style={styles.personName}>
                    {person.name.split(" ")[0]}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Рядок іконок додатків */}
            <View style={styles.shareMenuApps}>
              {APP_SHARE_DATA.map((app) => (
                <TouchableOpacity key={app.id} style={styles.appItem}>
                  <View
                    style={[styles.appIcon, { backgroundColor: app.color }]}
                  >
                    <Ionicons
                      name={app.icon as any}
                      size={28}
                      color={COLORS.white}
                    />
                  </View>
                  <Text style={styles.appName}>{app.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Кнопки дій */}
            <TouchableOpacity style={styles.shareMenuActionButton}>
              <Text style={styles.shareMenuActionText}>Copy</Text>
              <Ionicons name="copy-outline" size={24} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareMenuActionButton}>
              <Text style={styles.shareMenuActionText}>Add to readinglist</Text>
              <Ionicons name="eye-outline" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 🔻 Bottom Navigation */}
      <View style={styles.bottomTabBar}>
        <TabBarItem
          iconName="home-outline"
          label="Home"
          active={true}
          onPress={handleHomePress}
        />
        <TabBarItem
          iconName="search-outline"
          label="Discovery"
          active={false}
          onPress={handleDiscoveryPress}
        />
        <TabBarItem
          iconName="chatbubble-outline"
          label="Chats"
          active={false}
          onPress={handleChatsPress}
        />
        <TabBarItem
          iconName="people-outline"
          label="My Friends"
          active={false}
          onPress={handleFriendsPress}
        />
        <TabBarItem
          iconName="person-outline"
          label="Profile"
          active={false}
          onPress={handleProfilePress}
        />
      </View>
    </View>
  );
};

/* --- Tab Bar Item --- */
const TabBarItem = ({ iconName, label, active, onPress }: any) => (
  <TouchableOpacity style={styles.tabBarItem} onPress={onPress}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollView: { flex: 1 },
  cardContainer: { width: screenWidth, height: screenHeight },
  imageBackground: { flex: 1, justifyContent: "flex-end" },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  dishTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.white,
    position: "absolute",
    top: 100,
    left: 20,
    right: 150,
  },
  sideIcons: {
    position: "absolute",
    top: 430,
    right: 20,
    alignItems: "center",
  },
  sideIconItem: { alignItems: "center", marginBottom: 35 },
  sideIconImage: { width: 66, height: 66, resizeMode: "contain" },
  infoBlock: { paddingHorizontal: 20, paddingBottom: 100 },
  restaurantTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.white },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  metaText: { fontSize: 14, color: COLORS.white },
  metaTextDivider: { fontSize: 14, color: COLORS.white, marginHorizontal: 8 },
  ratingRow: { flexDirection: "row", marginBottom: 15 },
  ratingBoxTransparent: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    marginRight: 10,
  },
  ratingTextDark: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 6,
  },
  googleLogo: { width: 16, height: 16, resizeMode: "contain", marginRight: 5 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  actionButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDishButton: {
    flex: 1,
    backgroundColor: "rgba(233,114,92,0.3)",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  viewDishText: { fontSize: 16, fontWeight: "bold", color: COLORS.white },
  orderNowButton: { flex: 1.2, backgroundColor: COLORS.primary },
  orderNowText: { fontSize: 16, fontWeight: "bold", color: COLORS.white },
  headerFixed: {
    position: "absolute",
    top: Platform.select({ ios: 45, android: StatusBar.currentHeight || 35 }),
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 20,
  },
  topProgressWrapper: {
    width: screenWidth - 100,
    alignSelf: "center",
    marginBottom: 12,
  },
  topProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topProgressBar: {
    flex: 1,
    height: 5,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 3,
  },
  topActiveBar: { backgroundColor: COLORS.primary },
  headerIcon: {
    position: "absolute",
    right: 20,
    top: Platform.select({ ios: 0, android: -5 }),
  },
  tabBarItem: { alignItems: "center", flex: 1 },
  tabBarLabel: { fontSize: 10, marginTop: 2, fontWeight: "500" },

  /* --- Bottom Navigation --- */
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    height: 80,
    borderTopColor: "#E0E0E0",
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  /* --- Share Menu Styles --- */
  shareMenuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareMenuContainer: {
    width: screenWidth * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    maxHeight: screenHeight * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shareMenuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  eatScannerLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  eatText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginRight: 2,
  },
  shareMenuHeaderContent: {
    flex: 1,
    marginLeft: 10,
  },
  shareMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  shareMenuUrl: {
    fontSize: 12,
    color: "#888",
  },
  shareMenuCloseButton: {
    padding: 5,
  },
  shareMenuPeopleScroll: {
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  personItem: {
    alignItems: "center",
    marginRight: 15,
    width: 60,
  },
  personAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
    overflow: "hidden",
  },
  personAvatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  personAppIcon: {
    position: "absolute",
    bottom: 10,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  personName: {
    fontSize: 10,
    textAlign: "center",
    color: COLORS.text,
  },
  shareMenuApps: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  appItem: {
    alignItems: "center",
    width: "25%",
    marginBottom: 10,
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  appName: {
    fontSize: 10,
    textAlign: "center",
    color: COLORS.text,
  },
  shareMenuActionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  shareMenuActionText: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default HomePageScreen;
