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

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUpSetPassword1"
>;

export default function CreatePasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // 🔹 Тепер кнопка активна, якщо користувач прийняв умови
  const isActive = accepted;

  const handleSubmit = () => {
    if (password.length < 8) {
      alert("❌ Password must be at least 8 characters long!");
    } else if (password !== repeatPassword) {
      alert("❌ Passwords do not match!");
    } else {
      // Перехід на наступну сторінку після успішного створення пароля
      navigation.navigate("SignUp");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* 🔹 Лого */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logoScaner.png")}
          style={styles.logo}
        />
      </View>

      {/* Контент */}
      <View style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.inactiveTab]}>Sign In</Text>
          <Text style={[styles.tabText, styles.activeTab]}>Sign Up</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Create your password</Text>
        <Text style={styles.subtitle}>
          Your password must be at least 8 characters,{"\n"}including a number
          and a symbol.
        </Text>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
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

        {/* Repeat Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
            secureTextEntry={!showRepeatPassword}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
          <TouchableOpacity
            onPress={() => setShowRepeatPassword((prev) => !prev)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAccepted(!accepted)}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted && <View style={styles.checkboxInner} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I accept the terms and privacy policy
          </Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity
          disabled={!isActive}
          onPress={handleSubmit}
          style={[styles.createButton, isActive && styles.createButtonActive]}
        >
          <Text style={[styles.createText, isActive && { color: "#fff" }]}>
            Create Password
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => navigation.navigate("SignUpConfirmationCode1")}
        >
          <Image
            source={require("../../assets/google.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          style={[styles.socialButton, styles.lastSocialButton]}
          onPress={() => navigation.navigate("SignUpConfirmationCode1")}
        >
          <Image
            source={require("../../assets/facebook.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 25,
  },
  tabText: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  inactiveTab: {
    color: "#999",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: "#777",
    textAlign: "center",
    marginBottom: 25,
    fontSize: 14,
    lineHeight: 20,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 44,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 13,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
    marginBottom: 22,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#aaa",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: "#D06B5C",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#D06B5C",
    borderRadius: 5,
  },
  checkboxLabel: {
    color: "#333",
    fontSize: 14,
    flexShrink: 1,
  },
  createButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  createButtonActive: {
    backgroundColor: "#D06B5C",
  },
  createText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#999",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 14,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },
  socialText: {
    fontSize: 15,
    color: "#333",
  },
  lastSocialButton: {
    marginBottom: 40,
  },
});
