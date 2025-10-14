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

const { width } = Dimensions.get("window");

// --- ДАНІ ДЛЯ ПОШУКУ ДРУЗІВ ---

interface SearchFriend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFriend: boolean;
}

const SEARCH_FRIENDS_DATA: SearchFriend[] = [
  {
    id: "1",
    name: "Talia Gomez",
    username: "@foodie_iryna",
    avatar: "https://placehold.co/50x50/E57373/FFFFFF?text=TG",
    isFriend: false,
  },
  {
    id: "2",
    name: "Talia Goman",
    username: "@foodie_iryna",
    avatar: "https://placehold.co/50x50/3498DB/FFFFFF?text=TG",
    isFriend: false,
  },
  {
    id: "3",
    name: "Talia Gower",
    username: "@foodie_iryna",
    avatar: "https://placehold.co/50x50/2ECC71/FFFFFF?text=TG",
    isFriend: false,
  },
];

// --- КОМПОНЕНТ ЕЛЕМЕНТА СПИСКУ ---

const SearchFriendItem: React.FC<{ friend: SearchFriend }> = ({ friend }) => {
  const handleAddFriend = () => {
    console.log(`Add friend: ${friend.name}`);
    // Логіка додавання друга
  };

  return (
    <View style={styles.friendItemContainer}>
      <Image
        source={{ uri: friend.avatar }}
        style={styles.avatar}
        defaultSource={{
          uri: "https://placehold.co/50x50/CCCCCC/333333?text=User",
        }}
      />

      <View style={styles.userInfo}>
        <Text style={styles.nameText}>{friend.name}</Text>
        <Text style={styles.usernameText}>{friend.username}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- ОСНОВНИЙ КОМПОНЕНТ ---

interface SearchFriendsScreenProps {
  onBack?: () => void;
}

const SearchFriendsScreen: React.FC<SearchFriendsScreenProps> = ({ onBack }) => {
  const [searchText, setSearchText] = useState("Talia Gol");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      console.log("Back button pressed");
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Friends</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#333"
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
            onPress={handleClearSearch}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {searchText.length > 0 ? (
          SEARCH_FRIENDS_DATA.map((friend) => (
            <SearchFriendItem key={friend.id} friend={friend} />
          ))
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Start typing to search for friends
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
  
  // Header styles
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  // Search bar styles
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
  clearButton: {
    padding: 4,
  },

  // Scroll content
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Friend item styles
  friendItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  usernameText: {
    fontSize: 14,
    color: "#999",
  },

  // Add button styles
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E57373",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E57373",
  },

  // Empty state
  emptyStateContainer: {
    alignItems: "center",
    paddingTop: 50,
  },
  emptyStateText: {
    color: "#999",
    fontSize: 16,
  },
});

export default SearchFriendsScreen;
