import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
// Необхідно встановити: npm install react-native-safe-area-context
import { SafeAreaView } from "react-native-safe-area-context";

// Отримання розмірів екрана для адаптивності
const { width, height } = Dimensions.get("window");

// Імітація даних для фонового колажу.
// У реальному додатку ви б використовували справжні локальні зображення або URL.
const MOCK_IMAGE_URLS = [
  "https://placehold.co/600x600/a0a0a0/ffffff?text=Food+1",
  "https://placehold.co/600x600/f0f0f0/333333?text=Food+2",
  "https://placehold.co/600x600/808080/ffffff?text=Food+3",
  "https://placehold.co/600x600/cccccc/000000?text=Food+4",
  "https://placehold.co/600x600/777777/ffffff?text=Food+5",
  "https://placehold.co/600x600/dddddd/111111?text=Food+6",
  "https://placehold.co/600x600/606060/ffffff?text=Food+7",
  "https://placehold.co/600x600/eeeeee/222222?text=Food+8",
  "https://placehold.co/600x600/909090/ffffff?text=Food+9",
];

// Компонент для відображення фонового колажу
const FoodCollage: React.FC = () => (
  <View style={styles.collageContainer}>
    {MOCK_IMAGE_URLS.map((url, index) => (
      <ImageBackground
        key={index}
        source={{ uri: url }}
        style={styles.collageItem}
        imageStyle={{ opacity: 0.9 }} // Трохи затемнити зображення
      />
    ))}
  </View>
);

// Компонент Welcome Screen
const WelcomeScreen: React.FC = () => {
  // Функція для обробки натискання на кнопку (наприклад, перехід на екран реєстрації)
  const handleGetStarted = () => {
    console.log("Натиснуто: Get Started. Перехід до реєстрації/входу.");
    // Тут буде логіка навігації, наприклад: navigation.navigate('SignIn');
  };

  // Компонент SVG для імітації іконки шеф-кухаря (Спрощена версія)
  const ChefIcon = () => (
    <View style={styles.chefIconContainer}>
      {/* Імітація шапки (білий) */}
      <View style={styles.chefHatTop} />
      {/* Імітація обличчя (рожевий) */}
      <View style={styles.chefFace} />
      {/* Додаємо невеликий елемент (як на знімку екрана, наприклад, вуса або посмішка) */}
      <View style={styles.chefDetails} />
    </View>
  );

  return (
    // Використовуємо SafeAreaView для коректного відображення на всіх пристроях
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 1. Фоновий Колаж */}
      <FoodCollage />

      {/* 2. Затемнення */}
      <View style={styles.overlay} />

      {/* 3. Основний Контент (Логотип та Кнопка) */}
      <View style={styles.contentContainer}>
        {/* Блок Логотипу */}
        <View style={styles.logoBox}>
          <ChefIcon />
          <Text style={styles.logoText}>
            <Text style={styles.logoEat}>eat</Text>
            <Text style={styles.logoScanner}>Scanner</Text>
          </Text>
        </View>

        {/* Кнопка "Get Started" */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        {/* Додатковий текст */}
        <Text style={styles.tagline}>
          Find the perfect meal video, scan it, and order!
        </Text>
      </View>
    </SafeAreaView>
  );
};

// --- СТИЛІ ---

const PRIMARY_PINK = "#E57373";
const BLACK_TEXT = "#1F2937"; // Майже чорний

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },

  // --- Фоновий Колаж ---
  collageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  collageItem: {
    // Кожен елемент займає 1/3 ширини і висоти для створення сітки 3x3
    width: width / 3,
    height: height / 3,
  },

  // --- Затемнення ---
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Затемнення
    zIndex: 10,
  },

  // --- Центральний Контент ---
  contentContainer: {
    flex: 1,
    zIndex: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  // --- Логотип та Блок ---
  logoBox: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 20, // Заокруглення кутів
    width: "100%",
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15, // Для Android
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 10,
    letterSpacing: 1,
  },
  logoEat: {
    color: PRIMARY_PINK,
  },
  logoScanner: {
    color: BLACK_TEXT,
    fontWeight: "bold",
  },

  // --- Іконка Шеф-кухаря (Спрощена імітація SVG) ---
  chefIconContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  chefHatTop: {
    width: 30,
    height: 15,
    backgroundColor: PRIMARY_PINK,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: -2,
  },
  chefFace: {
    width: 40,
    height: 40,
    backgroundColor: PRIMARY_PINK,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff", // Світла облямівка
    justifyContent: "center",
    alignItems: "center",
  },
  chefDetails: {
    position: "absolute",
    top: 40,
    width: 10,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 3,
  },

  // --- Кнопка ---
  getStartedButton: {
    width: "100%",
    maxWidth: 300,
    paddingVertical: 18,
    backgroundColor: "white", // Білий фон
    borderRadius: 50,
    borderWidth: 2,
    borderColor: BLACK_TEXT, // Чорна облямівка
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: BLACK_TEXT,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  getStartedText: {
    color: BLACK_TEXT,
    fontSize: 18,
    fontWeight: "800",
  },

  // --- Слоган ---
  tagline: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default WelcomeScreen;
