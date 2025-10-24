import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// --- ІМІТАЦІЯ ДАНИХ ---
const IMAGE_ASSETS = {
  profile1: 1,
  profile2: 2,
  profile3: 3,
  profile4: 4,
} as const;

type AvatarKey = keyof typeof IMAGE_ASSETS;

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: AvatarKey;
  isFriend: boolean;
}

const INITIAL_FRIEND_LIST: Friend[] = [
  {
    id: "1",
    name: "Iryna Hvozdetsta",
    username: "@foodie_iryna",
    avatar: "profile1",
    isFriend: true,
  },
  {
    id: "2",
    name: "Talia Gomer",
    username: "@foodie_iryna",
    avatar: "profile2",
    isFriend: true,
  },
  {
    id: "3",
    name: "Iryna Hvozdetsta",
    username: "@foodie_iryna",
    avatar: "profile3",
    isFriend: true,
  },
  {
    id: "4",
    name: "Talia Goman",
    username: "@foodie_iryna",
    avatar: "profile4",
    isFriend: true,
  },
];

const FRIEND_LIST: Friend[] = [
  ...INITIAL_FRIEND_LIST,
  ...INITIAL_FRIEND_LIST.map((f, i) => ({
    ...f,
    id: `d${i + 5}`,
    isFriend: true,
    name: f.name.replace("(Copy)", "").trim() + " (Copy)",
  })),
];

const SEARCH_RESULTS: Friend[] = [
  {
    id: "s1",
    name: "Talia Gomez",
    username: "@foodie_iryna",
    avatar: "profile1",
    isFriend: false,
  },
  {
    id: "s2",
    name: "Talia Goman",
    username: "@foodie_iryna",
    avatar: "profile2",
    isFriend: false,
  },
  {
    id: "s3",
    name: "Talia Gower",
    username: "@foodie_iryna",
    avatar: "profile3",
    isFriend: false,
  },
];

// --- Аватар ---
const getAvatarSource = (key: AvatarKey): ImageSourcePropType => {
  switch (key) {
    case "profile1":
      return { uri: "https://placehold.co/50x50/E57373/FFFFFF?text=P1" };
    case "profile2":
      return { uri: "https://placehold.co/50x50/3498DB/FFFFFF?text=P2" };
    case "profile3":
      return { uri: "https://placehold.co/50x50/2ECC71/FFFFFF?text=P3" };
    default:
      return { uri: "https://placehold.co/50x50/9B59B6/FFFFFF?text=P4" };
  }
};

// --- Елемент списку ---
const FriendListItemFixed: React.FC<{ 
  friend: Friend; 
  onRemoveFriend?: (friendId: string) => void;
}> = ({ friend, onRemoveFriend }) => {
  const buttonText = friend.isFriend ? "Remove" : "Add";
  const buttonStyle = friend.isFriend
    ? styles.removeButtonContainer
    : styles.addButtonContainer;
  const textStyle = friend.isFriend ? styles.removeText : styles.addText;

  const handleAction = () => {
    if (friend.isFriend && onRemoveFriend) {
      onRemoveFriend(friend.id);
    } else {
      console.log(`Add ${friend.name}`);
    }
  };

  return (
    <View style={styles.listItemContainer}>
      <Image
        source={getAvatarSource(friend.avatar)}
        style={styles.avatar}
        defaultSource={{
          uri: "https://placehold.co/50x50/CCCCCC/333333?text=User",
        }}
      />
      <View style={styles.userInfo}>
        <Text style={styles.nameText}>{friend.name}</Text>
        <Text style={styles.usernameText}>{friend.username}</Text>
      </View>

      <TouchableOpacity style={buttonStyle} onPress={handleAction}>
        <Text style={textStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Основний екран ---
const FriendsScreenFinal: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [friendsList, setFriendsList] = useState<Friend[]>(FRIEND_LIST);
  const isSearching = searchText.length > 0;
  const displayList = isSearching ? SEARCH_RESULTS : friendsList;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRemoveFriend = (friendId: string) => {
    setFriendsList(prevList => 
      prevList.filter(friend => friend.id !== friendId)
    );
    console.log(`Friend with ID ${friendId} removed from list`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Friends</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Пошук */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search anyone..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Список друзів */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayList.map((friend) => (
          <FriendListItemFixed 
            key={friend.id} 
            friend={friend} 
            onRemoveFriend={handleRemoveFriend}
          />
        ))}

        {isSearching && displayList.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              No users found matching "{searchText}"
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- СТИЛІ ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    position: "relative",
    width: width,
  },
  backButton: {
    padding: 10,
    zIndex: 10,
  },
  screenTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    paddingVertical: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    ...Platform.select({
      android: { paddingVertical: 0 },
    }),
  },
  clearButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  usernameText: {
    fontSize: 14,
    color: "#999",
  },
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  removeButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(229, 115, 115, 0.1)",
    borderWidth: 1,
    borderColor: "#E57373",
  },
  addText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  removeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E57373",
  },
  noResultsContainer: {
    alignItems: "center",
    paddingTop: 50,
  },
  noResultsText: {
    color: "#999",
    fontSize: 16,
  },
});

export default FriendsScreenFinal;
