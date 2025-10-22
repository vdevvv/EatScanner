import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи навігації
type RootStackParamList = {
  HomePageScreen: undefined;
  FriendsProfileScreen: undefined;
};

type FriendsProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FriendsProfileScreen"
>;

const { width } = Dimensions.get("window");

// Дані
const PROFILE_DATA = {
  name: "Talia Gomez",
  username: "@foodie_iryna",
  mutualFriends: 40,
  profileImage: require("../../assets/profile-avatar.jpg"),
};

const MUTUAL_FRIENDS = [
  { id: "1", image: require("../../assets/friend1.jpg") },
  { id: "2", image: require("../../assets/friend2.jpg") },
  { id: "3", image: require("../../assets/friend3.jpg") },
  { id: "4", image: require("../../assets/friend4.jpg") },
  { id: "5", image: require("../../assets/profile-avatar.jpg") },
];

const PAST_ORDERS = [
  {
    id: "1",
    title: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: require("../../assets/sushi-dragons.jpg"),
  },
  {
    id: "2",
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: require("../../assets/potato-green.jpg"),
  },
  {
    id: "3",
    title: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: require("../../assets/sushi-dragons.jpg"),
  },
  {
    id: "4",
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: require("../../assets/potato-green.jpg"),
  },
];

const MENU_OPTIONS = [
  { id: "1", title: "Share Profile" },
  { id: "2", title: "Add to the Group" },
  { id: "3", title: "Remove Friend" },
  { id: "4", title: "Block User" },
  { id: "5", title: "Report", isRed: true },
];

const FriendsProfileScreen: React.FC = () => {
  const navigation = useNavigation<FriendsProfileNavigationProp>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleBackPress = () => navigation.navigate("HomePageScreen");
  const handleMenuPress = () => setIsMenuVisible(true);
  const handleMenuClose = () => setIsMenuVisible(false);

  const handleMenuOption = (option: any) => {
    console.log("Selected:", option.title);
    setIsMenuVisible(false);
  };

  const renderMutualFriend = ({ item }: { item: any }) => (
    <Image source={item.image} style={styles.mutualFriendImage} />
  );

  const renderPastOrder = ({ item }: { item: any }) => (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.orderImage} />
      <Text style={styles.orderTitle}>{item.title}</Text>
      <Text style={styles.orderRestaurant}>{item.restaurant}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{PROFILE_DATA.username}</Text>
        <TouchableOpacity onPress={handleMenuPress}>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={PROFILE_DATA.profileImage}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{PROFILE_DATA.name}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Mutual Friends */}
        <View style={styles.mutualFriendsSection}>
          <Text style={styles.mutualFriendsText}>
            {PROFILE_DATA.mutualFriends} Mutual Friends
          </Text>
          <FlatList
            data={MUTUAL_FRIENDS}
            renderItem={renderMutualFriend}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mutualFriendsList}
          />
        </View>

        {/* Past Orders */}
        <View style={styles.pastOrdersSection}>
          <Text style={styles.sectionTitle}>Past Orders</Text>
          <FlatList
            data={PAST_ORDERS}
            renderItem={renderPastOrder}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.ordersGrid}
          />
        </View>
      </ScrollView>

      {/* Popup Menu */}
      <Modal
        visible={isMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={handleMenuClose}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={handleMenuClose}
        >
          <View style={styles.menuContainer}>
            {MENU_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.menuOption,
                  option.isRed && styles.menuOptionRed,
                ]}
                onPress={() => handleMenuOption(option)}
              >
                <Text
                  style={[
                    styles.menuOptionText,
                    option.isRed && styles.menuOptionTextRed,
                  ]}
                >
                  {option.title}
                </Text>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={option.isRed ? "#E53935" : "#222"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

// ------------------ СТИЛІ ------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 15,
  },
  followButton: {
    backgroundColor: "#D66E61",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mutualFriendsSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  mutualFriendsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 15,
  },
  mutualFriendsList: {
    paddingRight: 20,
  },
  mutualFriendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  pastOrdersSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
  },
  ordersGrid: {
    justifyContent: "space-between",
  },
  orderItem: {
    width: (width - 60) / 2,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  orderRestaurant: {
    fontSize: 12,
    color: "#666",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  // MENU
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 20,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    width: 230,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  menuOptionRed: {
    borderTopWidth: 0.8,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  menuOptionText: {
    fontSize: 16,
    color: "#111",
  },
  menuOptionTextRed: {
    color: "#E53935",
    fontWeight: "600",
  },
});

export default FriendsProfileScreen;
