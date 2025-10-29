import {TouchableOpacity, Text, View, StyleSheet, Platform, StatusBar, Dimensions} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

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

const TabBars = () => {
  const navigation = useNavigation<HomePageNavigationProp>();

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
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
  );
};

export default TabBars;

const TabBarItem = (
  {
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
        {color: active ? COLORS.primary : COLORS.textGrey},
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  scrollView: {flex: 1},
  cardContainer: {width: screenWidth, height: screenHeight},
  imageBackground: {flex: 1, justifyContent: "flex-end"},
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
  sideIconItem: {alignItems: "center", marginBottom: 35},
  sideIconImage: {width: 66, height: 66, resizeMode: "contain"},
  infoBlock: {paddingHorizontal: 20, paddingBottom: 100},
  restaurantTitle: {fontSize: 18, fontWeight: "bold", color: COLORS.white},
  metaRow: {flexDirection: "row", alignItems: "center", marginBottom: 8},
  metaText: {fontSize: 14, color: COLORS.white},
  metaTextDivider: {fontSize: 14, color: COLORS.white, marginHorizontal: 8},
  ratingRow: {flexDirection: "row", marginBottom: 15},
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
  googleLogo: {width: 16, height: 16, resizeMode: "contain", marginRight: 5},
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
  viewDishText: {fontSize: 16, fontWeight: "bold", color: COLORS.white},
  orderNowButton: {flex: 1.2, backgroundColor: COLORS.primary},
  orderNowText: {fontSize: 16, fontWeight: "bold", color: COLORS.white},
  headerFixed: {
    position: "absolute",
    top: Platform.select({ios: 45, android: StatusBar.currentHeight || 35}),
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
  topActiveBar: {backgroundColor: COLORS.primary},
  headerIcon: {
    position: "absolute",
    right: 20,
    top: Platform.select({ios: 0, android: -5}),
  },
  tabBarItem: {alignItems: "center", flex: 1},
  tabBarLabel: {fontSize: 10, marginTop: 2, fontWeight: "500"},
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
