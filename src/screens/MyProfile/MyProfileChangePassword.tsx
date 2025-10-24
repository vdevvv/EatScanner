import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // ✅ додано

// --- ІНТЕРФЕЙСИ ---
interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

// --- КОМПОНЕНТ: ПОЛЕ ВВЕДЕННЯ ПАРОЛЯ ---
const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isVisible}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="••••••••••"
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity
          onPress={toggleVisibility}
          style={styles.toggleButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={isVisible ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#A0A0A0"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- ОСНОВНИЙ ЕКРАН ---
const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation(); // ✅ додано
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBack = () => {
    navigation.goBack(); // ✅ повернення назад
  };

  const handleSaveChanges = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Помилка", "Новий пароль та підтвердження не збігаються.");
      return;
    }

    console.log("Зміна пароля:", { oldPassword, newPassword });

    Alert.alert("Успіх", "Пароль успішно змінено!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    navigation.goBack(); // ✅ повернення після збереження
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Change Password</Text>

        <View style={styles.formContainer}>
          <PasswordInput
            label="Old password"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <PasswordInput
            label="New password"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <PasswordInput
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </ScrollView>

      {/* Кнопка збереження */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveChanges}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save changes</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {},
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingRight: 15,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 12,
    fontSize: 16,
    color: "#000",
  },
  toggleButton: {
    padding: 5,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    ...Platform.select({
      ios: { paddingBottom: 35 },
      android: { paddingBottom: 20 },
    }),
  },
  saveButton: {
    backgroundColor: "#cd6155",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ChangePasswordScreen;
