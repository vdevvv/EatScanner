import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const isValid =
    email.includes("@") &&
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    accepted;

  const handleSubmit = () => {
    alert("✅ Account created successfully!");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Лого */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logoScaner.png")}
            style={styles.logo}
          />
        </View>

        {/* Контент */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Discover meals you love.{"\n"}Watch it. Want it. Get it.
          </Text>

          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAccepted(!accepted)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
              {accepted && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.checkboxLabel}>
              I accept the terms and privacy policy
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            disabled={!isValid}
            onPress={handleSubmit}
            style={[styles.signUpButton, isValid && styles.signUpButtonActive]}
          >
            <Text style={[styles.signUpText, isValid && { color: "#fff" }]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Reset Password */}
          <View style={styles.resetContainer}>
            <Text style={styles.resetText}>Forget your password? </Text>
            <TouchableOpacity>
              <Text style={styles.resetLink}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 прибираємо білу підкладку
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent", // 🔥 прозорий фон
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  // --- Лого ---
  logoContainer: {
    position: "absolute",
    top: 30,
    alignSelf: "center",
    zIndex: 10,
    left: 90, // ✅ зміщення вправо на 30px
  },

  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },

  // --- Контент ближче до лого ---
  content: {
    marginTop: 210,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff", // ✅ чіткий білий фон, перекриє прозорість картинки
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    zIndex: 20, // поверх картинки
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#555",
    textAlign: "center",
    marginBottom: 22,
    fontSize: 14,
    lineHeight: 20,
  },

  // --- Інпути ---
  inputWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 14,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 44,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#fff", // чіткий білий фон тільки для інпутів
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },

  // --- Checkbox ---
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#aaa",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // щоб не просвічувався фон
  },
  checkboxChecked: {
    borderColor: "#000",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  checkboxLabel: {
    color: "#333",
  },

  // --- Кнопка ---
  signUpButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonActive: {
    backgroundColor: "#D06B5C",
  },
  signUpText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
  },

  // --- Reset password ---
  resetContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  resetText: {
    color: "#333",
  },
  resetLink: {
    color: "#000",
    fontWeight: "600",
  },
});
