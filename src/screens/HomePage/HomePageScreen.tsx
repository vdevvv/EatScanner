import React, {useState, useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {DishData} from "../../components/restaurantItem";

type RootStackParamList = {
  HomePageScreen: undefined;
  Discovery: undefined;
  DiscoverRestoranWhere: undefined;
  FriendsScreen: undefined;
  FriendsProfileFriends: undefined;
  FriendsProfileScreen: undefined;
  ProfileScreen: undefined;
  MyProfileScreen: undefined;
  DishDetailScreen: undefined;
  Order: undefined;
  Notifications: undefined;
};

type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePageScreen"
>;

/* ---------------- Дані ---------------- */
const videos = [
  require('../../assets/videos/golden-flacky.mp4'),
  require('../../assets/videos/golden-flacky.mp4'),
  require('../../assets/videos/golden-flacky.mp4'),
  require('../../assets/videos/golden-flacky.mp4'),
]

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
const saveIconRed = require("../../assets/Save-red.png");

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

const COLORS = {
  primary: "#E9725C",
  secondary: "#A8574B",
  white: "#FFFFFF",
  text: "#333333",
  textGrey: "#999",
  shadow: "rgba(0, 0, 0, 0.4)",
  background: "#F8F8F8",
};



const DISH_DATA: DishData[] = [
  {
    id: '1',
    title: "Herbed Golden Potatoes",
    restaurant: "Love Restaurant",
    location: "Dubai",
    distance: "3 miles away",
    rating: 5.0,
    userRating: 4.8,
    price: 45,
    imageSource: images[0],
    videoSource: videos[0],
  },
  {
    id: '2',
    title: "Beef Steak",
    restaurant: "Steak House",
    location: "Marina Walk",
    distance: "3.5 miles away",
    rating: 4.8,
    userRating: 4.6,
    price: 65,
    imageSource: images[6],
    videoSource: videos[1],
  },
  {
    id: '3',
    title: "Fish & Chips",
    restaurant: "Ocean View",
    location: "Beach Road",
    distance: "6 miles away",
    rating: 4.4,
    userRating: 4.2,
    price: 38,
    imageSource: images[7],
    videoSource: videos[2],
  },
  {
    id: '4',
    title: "Vegetarian Bowl",
    restaurant: "Healthy Choice",
    location: "Business Bay",
    distance: "2 miles away",
    rating: 4.6,
    userRating: 4.4,
    price: 32,
    imageSource: images[8],
    videoSource: videos[3],
  },
];

/* ---------------- Головний компонент ---------------- */
const HomePageScreen: React.FC = () => {
  const navigation = useNavigation<HomePageNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const [savedDishes, setSavedDishes] = useState<number[]>([]);
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

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
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
                onPress={() => handleNavigation("DishDetailScreen")}
              >
                <Text style={styles.viewDishText}>View Dish</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.orderNowButton]}
                onPress={() => handleNavigation("DiscoverRestoranWhere")} // ✅ Змінено навігацію
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

      {/* Верхня панель */}
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
          onPress={() => handleNavigation("Notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Свайп-карточки */}
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {DISH_DATA.map((dish, index) => renderDishCard(dish, index))}
      </ScrollView>

      {/* Нижня навігація */}
      <View style={styles.bottomTabBar}>
        <TabBarItem
          iconName="home-outline"
          label="Home"
          active
          onPress={() => handleNavigation("HomePageScreen")}
        />
        <TabBarItem
          iconName="search-outline"
          label="Discovery"
          onPress={() => handleNavigation("Discovery")}
        />
        <TabBarItem
          iconName="people-outline"
          label="My Friends"
          onPress={() => handleNavigation("FriendsProfileFriends")}
        />
        <TabBarItem
          iconName="person-outline"
          label="Profile"
          onPress={() => handleNavigation("MyProfileScreen")}
        />
      </View>
    </View>
  );
};

/* ---------------- Компонент нижньої вкладки ---------------- */
const TabBarItem = ({
  iconName,
  label,
  active,
  onPress,
}: {
  iconName: string;
  label: string;
  active?: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.tabBarItem} onPress={onPress}>
    <Ionicons
      name={iconName as any}
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

/* ---------------- Стилі ---------------- */
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
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
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
});

export default HomePageScreen;


// import RestaurantItem, {DishData} from "../../components/restaurantItem";
//
// const HomePageScreen = () => {
//   const [activeItemId, setActiveItemId] = useState<number>()
//   const scrollY = useSharedValue(0)
//
//   const onEndReached = () => {
//     console.log(1)
//   }
//
//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollY.value = event.contentOffset.y
//     }
//   })
//
//   return (
//     <Animated.FlatList
//       data={DISH_DATA}
//       keyExtractor={(item) => item.id}
//       renderItem={({item}) => (
//         <RestaurantItem item={item}/>
//       )}
//       pagingEnabled
//       showsVerticalScrollIndicator={false}
//       onMomentumScrollEnd={(e => {
//         const index = Math.round(e.nativeEvent.contentOffset.y / e.nativeEvent.layoutMeasurement.height);
//         setActiveItemId(index);
//       })}
//       onEndReached={onEndReached}
//       onEndReachedThreshold={0.5}
//       initialNumToRender={1}
//       maxToRenderPerBatch={2}
//       windowSize={3}
//       onScroll={scrollHandler}
//       scrollEventThrottle={16}
//
//     >
//
//     </Animated.FlatList>
//   );
// };
//
// export default HomePageScreen;
