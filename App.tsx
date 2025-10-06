import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

// ✅ Імпортуємо новий екран профілю користувача
import UserProfileScreen from "./src/screens/FriendsProfilescreen";

export default function App() {
  // Функція-заглушка для навігації
  const handleBack = () => {
    console.log('Навігація "Назад" наразі не використовується.');
  };

  return (
    // ➡️ Рендеримо компонент UserProfileScreen
    <View style={styles.container}>
      <UserProfileScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
