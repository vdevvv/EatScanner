import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // Імпорт типів навігації

type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CheckEmailscreen"
>;

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [email, setEmail] = useState("");
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleSubmit = () => {
    if (activeTab === "signup") {
      navigation.navigate("SignUpConfirmationCode1"); // 🔥 перехід на екран підтвердження
    } else {
      navigation.navigate("SignIn"); // 🔥 перехід на сторінку Sign In
    }
  };

  const handleSignInTabPress = () => {
    navigation.navigate("SignIn"); // 🔥 перехід на сторінку Sign In при натисканні табу
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Лого позаду */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logoScaner.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        {/* Верхня частина */}
        <View style={styles.topSection}>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={handleSignInTabPress} style={styles.tab}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === "signin" && styles.tabTextActive,
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("signup")}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "signup" && styles.tabTextActive,
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Підкреслення активного табу */}
          <View style={styles.tabUnderlineContainer}>
            <View
              style={[
                styles.tabUnderline,
                activeTab === "signin" ? { left: "0%" } : { left: "50%" },
              ]}
            />
          </View>

          {/* Заголовки */}
          <Text style={styles.title}>Enter your email</Text>
          <Text style={styles.subtitle}>
            We asking your email to send you verification code{"\n"}to confirm
            your account
          </Text>

          {/* Поле вводу */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />

          {/* Кнопка */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              email.length > 0 && styles.submitButtonActive,
            ]}
            disabled={email.length === 0}
            onPress={handleSubmit}
          >
            <Text
              style={[
                styles.submitText,
                email.length === 0 && { color: "#aaa" },
              ]}
            >
              {activeTab === "signup" ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Нижня частина - соціальні кнопки */}
        <View style={styles.bottomSection}>
          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or with</Text>
            <View style={styles.line} />
          </View>

          {/* Social buttons */}
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/google.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.lastSocialButton]}
          >
            <Image
              source={require("../../assets/facebook.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // --- Лого ---
  logoContainer: {
    position: "absolute",
    top: 20, // 🔼 зміщено вище
    alignSelf: "center",
    zIndex: -1,
    pointerEvents: "none",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    opacity: 0.95,
  },

  // --- Основний контент ---
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 180,
    paddingBottom: 40,
  },
  topSection: {
    alignItems: "center",
    width: "100%",
  },
  bottomSection: {
    alignItems: "center",
    width: "100%",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#000",
  },
  tabUnderlineContainer: {
    width: "100%",
    height: 2,
    backgroundColor: "#eee",
    position: "relative",
    marginBottom: 30,
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: 2,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#000",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 0,
  },
  submitButtonActive: {
    backgroundColor: "#E57373",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    color: "#888",
    marginHorizontal: 10,
    fontSize: 13,
  },
  socialButton: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },
  socialText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },
  lastSocialButton: {
    marginBottom: 0,
  },
});
