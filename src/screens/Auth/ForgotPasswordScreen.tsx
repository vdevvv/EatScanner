import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform, // Для специфічних стилів iOS/Android
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Конфігурація ---
const COLORS = {
  primary: "#E9725C", // Темно-помаранчевий (активна кнопка)
  buttonInactive: "#F5F5F5", // Світло-сірий фон (неактивна кнопка)
  buttonTextInactive: "#333333", // Темний текст для неактивної кнопки
  text: "#333333",
  placeholder: "#999999",
  inputBorder: "#CCCCCC",
  white: "#FFFFFF",
};

type ForgotPasswordScreenProps = {
  onBackPress?: () => void;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBackPress,
}) => {
  const [email, setEmail] = useState("");

  // Проста валідація для активації кнопки (зберігаємо логіку, але не використовуємо її для кольору кнопки)
  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  // Вирішуємо, чи кнопка повинна бути активною для натискання (логіка UX)
  const isButtonActiveForPress = email.length > 0; // На симуляторі кнопка червона, коли щось введено

  const handleResetPassword = () => {
    // Для реального застосування краще перевіряти isEmailValid
    if (isButtonActiveForPress) {
      Alert.alert(
        "Запит надіслано",
        `Інструкції для відновлення пароля надіслано на ${email}`
      );
      console.log("Sending reset link to:", email);
    } else {
      Alert.alert("Помилка", "Будь ласка, введіть вашу електронну пошту.");
    }
  };

  // Визначаємо колір кнопки: на скріншоті симулятора вона завжди помаранчева, якщо поле не пусте.
  // Якщо ви хочете, щоб вона була помаранчевою лише при валідному email, використовуйте isEmailValid.
  // Тут використовується isButtonActiveForPress, щоб відповідати вигляду симулятора.
  const buttonBackgroundColor = isButtonActiveForPress
    ? COLORS.primary
    : COLORS.buttonInactive;
  const buttonTextColor = isButtonActiveForPress
    ? COLORS.white
    : COLORS.buttonTextInactive;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* ⬅️ Header з кнопкою "назад" */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress || (() => console.log("Go Back"))}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Основний вміст */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>
          Please enter your email{"\n"}to reset the password
        </Text>

        {/* 📧 Поле вводу Email */}
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* 🔑 Кнопка "Reset Password" */}
        <TouchableOpacity
          // Використовуємо isButtonActiveForPress для активації натискання, щоб відповідати дизайну
          onPress={handleResetPassword}
          disabled={!isButtonActiveForPress}
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
        >
          <Text style={[styles.buttonText, { color: buttonTextColor }]}>
            Reset password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Стилізація ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    // На симуляторі відступ від верху менший, але це може бути особливість SafeAreaView
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 0, // Додатковий відступ для Android
  },
  backButton: {
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    // Зменшуємо горизонтальний відступ, щоб відповідати симулятору
    paddingHorizontal: 45,
    paddingTop: 80,
    // Змінюємо вирівнювання на центр, щоб відповідати симулятору
    alignItems: "center",
    width: "100%", // Важливо для центрування
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
    // ⚠️ Ключова зміна: Центрування тексту
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: 40,
    // ⚠️ Ключова зміна: Центрування тексту
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
