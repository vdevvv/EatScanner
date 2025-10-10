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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // ✅ Спрощена логіка валідації
  const isValid = email.includes("@") && password.length >= 6 && accepted;

  const handleSubmit = () => {
    if (isValid) {
      navigation.navigate("MyProfileScreen"); // ✅ Перехід
    } else {
      alert("❌ Please fill all fields correctly!");
    }
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
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  // --- Лого ---
  logoContainer: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    zIndex: 10,
  },
  logo: {
    width: 240,
    height: 240,
    resizeMode: "contain",
  },

  // --- Контент ---
  content: {
    marginTop: 280,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: "#000",
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
    backgroundColor: "#fff",
    color: "#000",
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
    backgroundColor: "#fff",
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
