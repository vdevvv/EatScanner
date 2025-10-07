import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Примітка: для роботи вам потрібна бібліотека react-native-svg для відтворення складної ілюстрації
// Оскільки ми не можемо використовувати SVG-бібліотеки, я замінюю ілюстрацію на простий компонент
// з іконками, що імітує "порожній" стан, та додаю велику лупу (magnifying glass)
// відповідно до зображення.

const { width } = Dimensions.get("window");

// Імітація ілюстрації "No Data"
const NoDataIllustration: React.FC = () => (
  <View style={illustrationStyles.container}>
    {/* Імітація папки з помилкою */}
    <Ionicons
      name="folder-open-outline"
      size={80}
      color="#ccc"
      style={illustrationStyles.folder}
    />
    {/* Імітація знаку питання/лупи */}
    <View style={illustrationStyles.magnifyingGlass}>
      <Ionicons name="search-outline" size={40} color="#888" />
    </View>
    {/* Імітація сумного обличчя на папці */}
    <View style={illustrationStyles.sadFace}>
      <Text style={illustrationStyles.sadFaceText}>:(</Text>
    </View>
  </View>
);

const illustrationStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    marginBottom: 30,
    position: "relative",
  },
  folder: {
    // Задній план, що імітує папку
    transform: [{ rotate: "-10deg" }],
    opacity: 0.8,
  },
  magnifyingGlass: {
    // Лупа
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  sadFace: {
    position: "absolute",
    top: 60,
    left: 35,
  },
  sadFaceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
  },
});

// --- ОСНОВНИЙ КОМПОНЕНТ ---

const NoSavedVideosScreen: React.FC = () => {
  const handleGoToDiscovery = () => {
    console.log("Navigating to Discovery Page...");
    // Логіка переходу
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка з кнопкою "Назад" та заголовком */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        {/* Заголовок, який центрується абсолютно (як ми виправляли раніше) */}
        <Text style={styles.screenTitle}>Saved Video</Text>
        {/* Пустий елемент для вирівнювання праворуч */}
        <View style={{ width: 28 }} />
      </View>

      {/* Центральний контент: Ілюстрація та текст */}
      <View style={styles.contentContainer}>
        <NoDataIllustration />

        <Text style={styles.mainTitle}>No Videos Yet</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>Your feed is still cooking...</Text>
          {/* Іконка лупи, як на скріншоті */}
          <Ionicons
            name="search-outline"
            size={18}
            color="#777"
            style={{ marginLeft: 5, marginTop: 1 }}
          />
        </View>
      </View>

      {/* Футер з великою кнопкою */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleGoToDiscovery}
        >
          <Text style={styles.actionButtonText}>Go To Discovery Page</Text>
        </TouchableOpacity>
      </View>
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

  // --- Стилі Центрального Контенту ---
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 100, // Додатковий відступ, щоб контент був вище
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },

  // --- Стилі Футера та Кнопки ---
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: "#fff",
  },
  actionButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    // Точний колір з кнопки на скріншоті
    backgroundColor: "#E57373",
    // Тінь (використовуємо Platform.select для кросплатформності)
    ...Platform.select({
      ios: {
        shadowColor: "#E57373",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default NoSavedVideosScreen;
