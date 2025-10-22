import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи для навігації
type RootStackParamList = {
  HomePageScreen: undefined;
  Discovery: undefined; // Corrected the name to match the navigation call
  ChatsScreen: undefined;
  FriendsScreen: undefined;
  FriendsProfileFriends: undefined;
  FriendsProfileScreen: undefined;
  ProfileScreen: undefined;
  MyProfileScreen: undefined;
  DishDetailScreen: undefined;
  OrderScreen: undefined;
};

const COLORS = {
  primary: "#E9725C",
  textDark: "#1F2937",
  textGrey: "#6B7280",
  background: "#FFFFFF",
  divider: "#E5E7EB",
};

// Демодані
const FRIENDS = [
  {
    id: "1",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend1.jpg"),
    status: "add", // add | cancel | message
  },
  {
    id: "2",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend2.jpg"),
    status: "add",
  },
  {
    id: "3",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend3.jpg"),
    status: "cancel",
  },
  {
    id: "4",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend4.jpg"),
    status: "cancel",
  },
  {
    id: "5",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend1.jpg"),
    status: "add",
  },
  {
    id: "6",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend2.jpg"),
    status: "message",
  },
  {
    id: "7",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend3.jpg"),
    status: "message",
  },
  {
    id: "8",
    name: "Iryna Hvozdetska",
    handle: "@foodie_iryna",
    avatar: require("../../assets/friend4.jpg"),
    status: "add",
  },
];

type FriendsListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FriendsProfileFriends"
>;

export default function FriendsListScreen() {
  const navigation = useNavigation<FriendsListNavigationProp>();
  const [search, setSearch] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  // Навігаційні функції для нижнього таб меню
  const handleHomePress = () => {
    navigation.navigate("HomePageScreen");
  };

  const handleDiscoveryPress = () => {
    navigation.navigate("Discovery");
  };

  const handleChatsPress = () => {
    navigation.navigate("ChatsScreen");
  };

  const handleFriendsPress = () => {
    // Вже на FriendsProfileFriends
    console.log("Friends pressed");
  };

  const handleProfilePress = () => {
    navigation.navigate("MyProfileScreen");
  };

  const handleFriendPress = (friendId: string) => {
    navigation.navigate("FriendsProfileScreen");
  };

  // Функції для обробки натискань кнопок дій
  const handleAddFriend = (friendId: string) => {
    console.log(`Adding friend with ID: ${friendId}`);
    // Тут можна додати логіку для відправки запиту на додавання в друзі
    // Наприклад, оновити статус друга в локальному стані або відправити запит на сервер
  };

  const handleCancelRequest = (friendId: string) => {
    console.log(`Cancelling request for friend with ID: ${friendId}`);
    // Тут можна додати логіку для скасування запиту в друзі
    // Наприклад, оновити статус друга в локальному стані або відправити запит на сервер
  };

  const handleMessage = (friendId: string) => {
    console.log(`Messaging friend with ID: ${friendId}`);
    // Тут можна додати логіку для переходу до чату з другом
    // Наприклад: navigation.navigate("ChatScreen", { friendId });
  };

  const filtered = FRIENDS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderButton = (status: string, friendId: string) => {
    switch (status) {
      case "add":
        return (
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => handleAddFriend(friendId)}
            activeOpacity={0.7}
          >
            <Ionicons name="add-outline" size={18} color={COLORS.primary} />
            <Text style={styles.actionTextAdd}>Add Friend</Text>
          </TouchableOpacity>
        );
      case "cancel":
        return (
          <TouchableOpacity 
            style={styles.removeBtn}
            onPress={() => handleCancelRequest(friendId)}
            activeOpacity={0.7}
          >
            <Text style={styles.actionTextRemove}>Cancel Request</Text>
          </TouchableOpacity>
        );
      case "message":
        return (
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => handleMessage(friendId)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.actionTextAdd}>Message</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Talia`s Friends (212)</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={COLORS.textGrey} />
        <TextInput
          placeholder="Search anyone..."
          placeholderTextColor={COLORS.textGrey}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.friendItem}
            onPress={() => handleFriendPress(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.friendInfo}>
              <Image source={item.avatar} style={styles.avatar} />
              <View>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendHandle}>{item.handle}</Text>
              </View>
            </View>
            {renderButton(item.status, item.id)}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 4, backgroundColor: "transparent" }} />
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* 🔻 Bottom Navigation */}
      <View style={styles.bottomTabBar}>
        <TabBarItem
          iconName="home-outline"
          label="Home"
          active={false}
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
          active={true}
          onPress={handleFriendsPress}
        />
        <TabBarItem
          iconName="person-outline"
          label="Profile"
          active={false}
          onPress={handleProfilePress}
        />
      </View>
    </SafeAreaView>
  );
}

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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textDark,
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  friendHandle: {
    fontSize: 13,
    color: COLORS.textGrey,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  removeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionTextAdd: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
  actionTextRemove: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },

  /* --- Bottom Navigation --- */
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    height: 80,
    borderTopColor: "#E0E0E0",
    backgroundColor: COLORS.background,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarItem: { alignItems: "center", flex: 1 },
  tabBarLabel: { fontSize: 10, marginTop: 2, fontWeight: "500" },
});
