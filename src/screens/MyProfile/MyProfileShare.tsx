import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
// Ширина одного елемента сітки (приблизно половина ширини екрана мінус відступи)
const ITEM_WIDTH = (width - 36) / 2; // 36 = 12 (лівий) + 12 (правий) + 12 (між елементами)

// --- ІМІТАЦІЯ ДАНИХ ТА АСЕТІВ ---

// Примітка: для роботи вам потрібно додати ці файли або змінити шляхи
const IMAGE_ASSETS = {
  sushi: require("../components/sushi-dragons.jpg"),
  potatoes: require("../components/potatoes-square.jpg"),
};

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  image: number; // Використовуємо number для require
}

const SAVED_VIDEOS: VideoItem[] = [
  {
    id: "1",
    title: "Sushi Dragons",
    subtitle: "Chefs Hall",
    image: IMAGE_ASSETS.sushi,
  },
  {
    id: "2",
    title: "Herbed Golden Potatoes",
    subtitle: "A Mano",
    image: IMAGE_ASSETS.potatoes,
  },
  {
    id: "3",
    title: "Herbed Golden Potatoes",
    subtitle: "A Mano",
    image: IMAGE_ASSETS.potatoes,
  },
  {
    id: "4",
    title: "Sushi Dragons",
    subtitle: "Chefs Hall",
    image: IMAGE_ASSETS.sushi,
  },
  {
    id: "5",
    title: "Sushi Dragons",
    subtitle: "Chefs Hall",
    image: IMAGE_ASSETS.sushi,
  },
  {
    id: "6",
    title: "Herbed Golden Potatoes",
    subtitle: "A Mano",
    image: IMAGE_ASSETS.potatoes,
  },
  // Додаємо ще кілька, щоб заповнити екран і показати прокрутку
  {
    id: "7",
    title: "Herbed Golden Potatoes",
    subtitle: "A Mano",
    image: IMAGE_ASSETS.potatoes,
  },
  {
    id: "8",
    title: "Sushi Dragons",
    subtitle: "Chefs Hall",
    image: IMAGE_ASSETS.sushi,
  },
];

const totalVideos = SAVED_VIDEOS.length;

// --- КОМПОНЕНТ КАРТКИ ВІДЕО ---

const VideoCard: React.FC<{ item: VideoItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8}>
      <Image source={item.image} style={styles.cardImage} />

      {/* Елемент, що імітує ледь помітну червону закладку */}
      <View style={styles.bookmarkOverlay}>
        {/*
          Закладка реалізована за допомогою View з червоним фоном
          та нахилом (transform: rotate(45deg)), щоб точно імітувати скріншот.
        */}
        <View style={styles.bookmarkShape} />
      </View>

      {/* Текст на зображенні */}
      <View style={styles.textOverlay}>
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={styles.subtitleContainer}>
          <Ionicons
            name="home-outline"
            size={14}
            color="#fff"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.subtitleText}>@{item.subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- ОСНОВНИЙ КОМПОНЕНТ ---

const SavedVideoScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка з абсолютним центруванням */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Saved Video</Text>
        {/* Кількість відео праворуч */}
        <Text style={styles.videoCountText}>{totalVideos} videos</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Сітка відео */}
        <View style={styles.gridContainer}>
          {SAVED_VIDEOS.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </View>
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
    // Абсолютне позиціонування для ідеального центрування
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    paddingVertical: 10,
  },
  videoCountText: {
    fontSize: 14,
    color: "#777",
    padding: 10,
  },

  // --- Стилі Сітки та Карток ---
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5, // Співвідношення сторін для вертикального відео, приблизно 2:3
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden", // Обрізаємо кути зображення
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // Стилі для червоної закладки
  bookmarkOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40, // Ширина контейнера закладки
    height: 40, // Висота контейнера закладки
    zIndex: 2, // Над зображенням
    overflow: "hidden", // Для коректного обрізання форми закладки
  },
  bookmarkShape: {
    // Трикутник/стрічка, повернута на 45 градусів
    position: "absolute",
    top: -15, // Зсуваємо вгору
    right: -15, // Зсуваємо вправо
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 100, 100, 0.6)", // Напівпрозорий червоний колір
    transform: [{ rotate: "45deg" }], // Поворот
  },

  // Стилі для накладеного тексту
  textOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  titleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    // Додаємо тінь для читабельності на світлому фоні
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    // Додаємо тінь для читабельності
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default SavedVideoScreen;
