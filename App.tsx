import { View, StyleSheet } from "react-native";

import RessetPassword3 from "./src/screens/HomePage/HomePageScreen";

import { StatusBar } from "expo-status-bar";

export default function App() {
  // Функція-заглушка для навігації (поки не додано навігатор)
  return (
    <View style={styles.container}>
      {/* Рендеримо компонент екрану профілю друзів */}
      <RessetPassword3 />

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
