import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => console.log("Sign In:", email, password);
  const handleSignUp = () => console.log("Sign Up:", email, password);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        >
          {/* Logo — не перекриває нічого */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logoScaner.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "signin" && styles.activeTab]}
              onPress={() => setActiveTab("signin")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "signin" && styles.activeTabText,
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "signup" && styles.activeTab]}
              onPress={() => setActiveTab("signup")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "signup" && styles.activeTabText,
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeSubtitle}>
              Discover meals you love.{"\n"}Watch it. Want it. Get it.
            </Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#444"
              />
            </TouchableOpacity>
          </View>

          {/* Sign In / Sign Up Button */}
          <TouchableOpacity
            style={[
              styles.button,
              activeTab === "signin"
                ? styles.signInButton
                : styles.signUpButton,
            ]}
            onPress={activeTab === "signin" ? handleSignIn : handleSignUp}
          >
            <Text style={styles.buttonText}>
              {activeTab === "signin" ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Reset Password */}
          {activeTab === "signin" && (
            <View style={styles.resetContainer}>
              <Text style={styles.resetText}>Forgot your password?</Text>
              <TouchableOpacity>
                <Text style={styles.resetLink}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By logging in, you confirm you agree to{" "}
            <Text style={styles.link}>Terms and conditions</Text> you read our{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 250,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 24,
  },
  tab: {
    paddingVertical: 8,
    width: "45%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#C8644D",
  },
  activeTabText: {
    color: "#000",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },
  welcomeSubtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 48,
    marginBottom: 14,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  input: {
    fontSize: 15,
    color: "#000",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  button: {
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 18,
  },
  signInButton: {
    backgroundColor: "#C8644D",
  },
  signUpButton: {
    backgroundColor: "#E57373",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resetContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 28,
  },
  resetText: {
    color: "#555",
    marginRight: 4,
  },
  resetLink: {
    color: "#C8644D",
    fontWeight: "600",
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    lineHeight: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  link: {
    color: "#C8644D",
    textDecorationLine: "underline",
  },
});
