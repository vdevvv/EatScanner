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
  // Type definition for require in React Native/Expo environment
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// --- 1. ІМІТАЦІЯ ДАНИХ ТА АСЕТІВ ---

// Важливо: у реальному проекті шляхи '../assets/' повинні бути коректними.
// Для цього прикладу я використовую універсальний плейсхолдер.
const IMAGE_ASSETS = {
  profile1: 1, // Placeholder number for ImageSourcePropType
  profile2: 2,
  profile3: 3,
  profile4: 4,
} as const;

// Тип для аватара
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

// Корекція: Об'єднуємо список друзів та дублікати в одну константу
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
    isFriend: false, // Новий користувач, показуємо кнопку "Add"
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

// --- 2. КОМПОНЕНТ ЕЛЕМЕНТА СПИСКУ ---

// Оскільки ми не можемо використовувати `require()` в цьому середовищі,
// ми імітуємо завантаження зображення через placeholder URL або заглушку.
const getAvatarSource = (key: AvatarKey): ImageSourcePropType => {
  // У реальному проекті тут було б щось на зразок:
  // return IMAGE_ASSETS[key];

  // Використовуємо placeholder URL для імітації (важливо для веб-превью)
  switch (key) {
    case "profile1":
      return { uri: "https://placehold.co/50x50/E57373/FFFFFF?text=P1" };
    case "profile2":
      return { uri: "https://placehold.co/50x50/3498DB/FFFFFF?text=P2" };
    case "profile3":
      return { uri: "https://placehold.co/50x50/2ECC71/FFFFFF?text=P3" };
    case "profile4":
    default:
      return { uri: "https://placehold.co/50x50/9B59B6/FFFFFF?text=P4" };
  }
};

const FriendListItemFixed: React.FC<{ friend: Friend }> = ({ friend }) => {
  const buttonText = friend.isFriend ? "Remove" : "Add";
  // Стиль кнопки залежить від стану
  const buttonStyle = friend.isFriend
    ? styles.removeButtonContainer
    : styles.addButtonContainer;
  // Стиль тексту залежить від стану
  const textStyle = friend.isFriend ? styles.removeText : styles.addText;

  const handleAction = () => {
    console.log(`${buttonText} ${friend.name}`);
    // Логіка оновлення стану друзів
  };

  return (
    <View style={styles.listItemContainer}>
      <Image
        source={getAvatarSource(friend.avatar)}
        style={styles.avatar}
        // Додаємо fallback, якщо placeholder не завантажиться
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

// --- 3. ОСНОВНИЙ КОМПОНЕНТ ЕКРАНУ ---

const FriendsScreenFinal: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const isSearching = searchText.length > 0;

  // Логіка: Якщо є текст у полі пошуку, показуємо фіксовані SEARCH_RESULTS.
  // В іншому випадку, показуємо FRIEND_LIST.
  const displayList = isSearching ? SEARCH_RESULTS : FRIEND_LIST;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Friends</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Поле Пошуку */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={"Search anyone..."}
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

      {/* Список Друзів / Результатів Пошуку */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayList.map((friend) => (
          <FriendListItemFixed key={friend.id} friend={friend} />
        ))}

        {/* Імітація випадку, коли пошук нічого не знайшов (для демонстрації) */}
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

// --- 4. СТИЛІ ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // --- Стилі Шапки ---
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

  // --- Стилі Пошукової Панелі ---
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
      android: {
        paddingVertical: 0,
      },
    }),
  },
  clearButton: {
    padding: 5,
  },

  // --- Стилі Списку ---
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
    backgroundColor: "#ccc", // fallback background color
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

  // --- Стилі Кнопок ---
  // Стиль для кнопки "Add" (сіра рамка)
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  // Стиль для кнопки "Remove" (прозорий червоний фон з червоними контурами)
  removeButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(229, 115, 115, 0.1)", // Прозорий червоний фон
    borderWidth: 1,
    borderColor: "#E57373", // Червона рамка
  },
  // Стилі для тексту всередині кнопки
  addText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333", // Чорний текст для "Add"
  },
  removeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E57373", // Червоний текст для "Remove"
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
