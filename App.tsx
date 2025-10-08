import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

// 🔹 Імпортуємо правильний файл (увага на великі літери у назві файлу)

import Discovery from "./src/screens/Discovery/DiscoveryPage";

export default function App() {
  // Функція-заглушка для навігації (поки не додано навігатор)
  const handleBack = () => {
    console.log('Навігація "Назад" наразі не використовується.');
  };

  return (
    <View style={styles.container}>
      {/* Рендеримо компонент екрану профілю друзів */}
      <Discovery />

      {/* Статус-бар (від Expo) */}
      <StatusBar style="auto" />
    </View>
  );
}

// 🔹 Стилі для базового контейнера
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
