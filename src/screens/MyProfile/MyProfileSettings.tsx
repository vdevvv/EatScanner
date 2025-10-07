import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// --- ІНТЕРФЕЙСИ ТА ТИПИ ---

// Визначаємо структуру елемента налаштувань
interface SettingItem {
  id: string;
  title: string;
  iconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary: "Ionicons" | "MaterialCommunityIcons";
  action: () => void; // Функція, що виконується при натисканні
  isDestructive?: boolean; // Для опції "Log Out"
}

// --- ІМІТАЦІЯ ДАНИХ ---

// Функція-заглушка для імітації навігації
const handleAction = (itemTitle: string) => {
  console.log(`Навігація до: ${itemTitle}`);
  // У реальному додатку тут була б навігація: navigation.navigate(item.id);
};

const SETTINGS_OPTIONS: SettingItem[] = [
  {
    id: "EditProfile",
    title: "Edit Profile",
    iconName: "pencil-outline",
    iconLibrary: "Ionicons",
    action: () => handleAction("Edit Profile"),
  },
  {
    id: "ChangePassword",
    title: "Change Password",
    iconName: "pencil-outline",
    iconLibrary: "Ionicons",
    action: () => handleAction("Change Password"),
  },
  {
    id: "PrivacyPolicy",
    title: "Privacy Policy",
    iconName: "lock-closed-outline",
    iconLibrary: "Ionicons",
    action: () => handleAction("Privacy Policy"),
  },
  {
    id: "TermsAndConditions",
    title: "Terms & Conditions",
    iconName: "folder-outline",
    iconLibrary: "Ionicons",
    action: () => handleAction("Terms & Conditions"),
  },
  {
    id: "HelpAndSupport",
    title: "Help & Support",
    iconName: "help-circle-outline",
    iconLibrary: "Ionicons",
    action: () => handleAction("Help & Support"),
  },
  {
    id: "LogOut",
    title: "Log Out",
    iconName: "exit-outline",
    iconLibrary: "Ionicons",
    action: () => handleAction("Log Out"),
    isDestructive: true,
  },
];

// --- ДОПОМІЖНИЙ КОМПОНЕНТ: ЕЛЕМЕНТ НАЛАШТУВАННЯ ---

const SettingRow: React.FC<{ item: SettingItem }> = ({ item }) => {
  const IconComponent =
    item.iconLibrary === "Ionicons" ? Ionicons : MaterialCommunityIcons;
  const iconSize = 24;

  // Колір тексту: червоний для Log Out, чорний для інших
  const textColor = item.isDestructive ? styles.logOutText : styles.defaultText;

  // Колір іконки: трохи світліший сірий
  const iconColor = item.isDestructive ? "#e57373" : "#333";

  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={item.action}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {/* Іконка */}
        <IconComponent
          // @ts-ignore: safe due to interface definition
          name={item.iconName}
          size={iconSize}
          color={iconColor}
        />
      </View>

      {/* Текст налаштування */}
      <Text style={[styles.rowTitle, textColor]}>{item.title}</Text>

      {/* Стрілка-індикатор */}
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );
};

// --- ОСНОВНИЙ КОМПОНЕНТ: ЕКРАН НАЛАШТУВАНЬ ---

const MyProfileSettings: React.FC = () => {
  const handleBack = () => {
    console.log("Натиснуто Назад");
    // Тут була б логіка навігації: navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
        {/* Пустий елемент для центрування (якщо потрібно) */}
        <View style={{ width: 48 }} />
      </View>

      {/* Список налаштувань */}
      <View style={styles.listContainer}>
        {SETTINGS_OPTIONS.map((item) => (
          <SettingRow key={item.id} item={item} />
        ))}
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
    paddingVertical: Platform.OS === "ios" ? 10 : 20, // Збільшуємо padding для Android
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 10,
  },
  screenTitle: {
    // Стилізація для центрування заголовка
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    paddingVertical: 10,
  },

  // --- Стилі Списку та Рядка ---
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5", // Дуже світла лінія-роздільник
  },
  iconContainer: {
    width: 32, // Фіксована ширина для вирівнювання іконок
    alignItems: "center",
    marginRight: 10,
  },
  rowTitle: {
    flex: 1, // Займає весь доступний простір
    fontSize: 16,
    fontWeight: "500",
  },

  // --- Стилі Тексту ---
  defaultText: {
    color: "#333",
  },
  logOutText: {
    color: "#e57373", // Червоний колір для "Log Out"
  },
});

export default MyProfileSettings;
