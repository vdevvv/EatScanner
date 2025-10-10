import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Використовуємо SVG-іконки або Unicode для імітації мобільного середовища,
// оскільки @expo/vector-icons недоступні у веб-симуляції.

// Типізація для даних користувача
interface User {
  username: string;
  name: string;
  avatarUri: string;
}

// Дані профілю, який заблоковано
const BLOCKED_USER: User = {
  username: "@foodie_iryna",
  name: "Talia Gomez",
  // Використовуємо placehold.co для placeholder-аватара
  avatarUri: "https://placehold.co/80x80/6E3A2F/ffffff?text=TG",
};

// Висота екрана для адаптивного стилю (імітуємо мобільний пристрій)
const screenHeight = Dimensions.get("window").height;

// --- ІКОНКИ (SVG або Emoji для сумісності) ---

// Замість Entypo dots-three-horizontal використовуємо три крапки (Unicode)
const MoreIcon = () => <Text style={styles.headerIconText}>...</Text>;

// Замість AntDesign arrowleft використовуємо Emoji або кастомний текст
const BackIcon = () => <Text style={styles.headerIconText}>{"<"}</Text>;

// --- ОСНОВНИЙ КОМПОНЕНТ ---

const BlockedUserScreen: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(true);

  // Функція для розблокування/блокування
  const handleToggleBlock = () => {
    setIsBlocked((prev) => !prev);
    if (isBlocked) {
      console.log(`User ${BLOCKED_USER.username} unblocked!`);
    } else {
      console.log(`User ${BLOCKED_USER.username} blocked!`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => console.log("Go back")}
        >
          <BackIcon />
        </TouchableOpacity>

        <Text style={styles.username}>{BLOCKED_USER.username}</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => console.log("More options")}
        >
          <MoreIcon />
        </TouchableOpacity>
      </View>

      {/* BODY CONTENT */}
      <View style={styles.container}>
        {/* Аватар */}
        <Image source={{ uri: BLOCKED_USER.avatarUri }} style={styles.avatar} />

        {/* Ім'я */}
        <Text style={styles.name}>{BLOCKED_USER.name}</Text>

        {/* Секція статусу (Block/Unblock) */}
        <View style={styles.statusSection}>
          {/* Іконка блокування (візуальна імітація) */}
          {isBlocked && (
            <View style={styles.blockIconContainer}>
              <View style={styles.blockIconCircle}>
                <View style={styles.blockIconLine} />
              </View>
            </View>
          )}

          {/* Основний заголовок */}
          <Text style={styles.mainTitle}>
            {isBlocked ? "You Have Blocked This User." : "You Are Connected."}
          </Text>

          {/* Підзаголовок */}
          <Text style={styles.subtitle}>
            {isBlocked
              ? "You won't see each other's content or be able to connect."
              : "You can see each other's content and connect."}
          </Text>

          {/* Кнопка дії */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: isBlocked
                  ? styles.actionButton.backgroundColor
                  : "#4CAF50",
              },
            ]}
            onPress={handleToggleBlock}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {isBlocked ? "Unblock" : "Block"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BlockedUserScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
  },
  headerButton: {
    padding: 5,
  },
  headerIconText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "normal",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    // Використовуємо відсоток від висоти, щоб розмістити блок по центру
    marginBottom: screenHeight * 0.1,
  },
  statusSection: {
    alignItems: "center",
    width: "100%",
  },
  // Стилі для іконки блокування
  blockIconContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  blockIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "#b45244",
    alignItems: "center",
    justifyContent: "center",
  },
  blockIconLine: {
    width: 70,
    height: 5,
    backgroundColor: "#b45244",
    transform: [{ rotate: "45deg" }],
    position: "absolute", // Важливо для правильного позиціонування
  },
  // Текстові стилі
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 24,
  },
  // Кнопка
  actionButton: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#D87A70", // Теракотовий колір для Unblock
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
