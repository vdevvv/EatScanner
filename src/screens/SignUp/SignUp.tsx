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

// Ensure that "SignIn" is included in the RootStackParamList

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const isValid = email.includes("@") && password.length >= 6 && accepted;

  const handleSubmit = () => {
    if (isValid) {
      navigation.navigate("MyProfileScreen");
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
        <View style={styles.headerTabs}>
          <TouchableOpacity
            style={[styles.tabButton, styles.activeTab]}
            onPress={() => {}}
          >
            <Text style={[styles.tabText, styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.tabText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- ЛОГО ---------- */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logoScaner.png")}
            style={styles.logo}
          />
        </View>

        {/* ---------- Основний контент ---------- */}
        <View style={styles.content}>
          <Text style={styles.title}>Enter your email</Text>
          <Text style={styles.subtitle}>
            We asking your email to send you verification code to confirm your
            account
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

          {/* Sign Up */}
          <TouchableOpacity
            disabled={!isValid}
            onPress={handleSubmit}
            style={[styles.signUpButton, isValid && styles.signUpButtonActive]}
          >
            <Text style={[styles.signUpText, isValid && { color: "#fff" }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* ---------- Footer ---------- */}
        <View style={styles.footer}>
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons
                name="logo-google"
                size={18}
                color="#000"
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Ionicons
                name="logo-facebook"
                size={18}
                color="#1877F2"
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  /* --- HEADER TABS --- */
  headerTabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 18,
    color: "#999",
    fontWeight: "600",
  },
  activeTab: {
    borderBottomColor: "#D06B5C",
  },
  activeTabText: {
    color: "#000",
  },

  logoContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  logo: {
    width: 277,
    height: 118,
    resizeMode: "contain",
  },

  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    color: "#555",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 26,
    lineHeight: 20,
    maxWidth: 300,
  },

  inputWrapper: { width: "100%", position: "relative" },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingLeft: 14,
    paddingRight: 44,
    fontSize: 15,
    marginBottom: 12,
    color: "#000",
    backgroundColor: "#fff",
  },
  eyeButton: { position: "absolute", right: 12, top: 12 },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 6,
    marginBottom: 20,
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
  },
  checkboxChecked: { borderColor: "#000" },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  checkboxLabel: { color: "#333", fontSize: 13.5 },

  signUpButton: {
    width: "100%",
    backgroundColor: "#f3f3f3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  signUpButtonActive: { backgroundColor: "#D06B5C" },
  signUpText: { fontSize: 16, fontWeight: "600", color: "#999" },

  footer: {
    marginTop: "auto",
    alignItems: "center",
    width: "100%",
    paddingBottom: 30,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
    alignSelf: "center",
    width: "100%",
  },
  line: { flex: 1, height: 1, backgroundColor: "#ddd" },
  dividerText: { marginHorizontal: 12, color: "#999", fontSize: 13 },

  socialButtons: { width: "100%", gap: 12 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
  },
  socialIcon: { marginRight: 10 },
  socialText: { fontSize: 15, color: "#000", fontWeight: "500" },
});
