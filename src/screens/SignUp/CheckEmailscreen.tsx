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

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log(activeTab === "signup" ? "Sign Up" : "Sign In", email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Логотип */}
        <Image
          source={require("../../assets/logoScaner.png")} // поклади свій логотип сюди
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("signin")}
            style={styles.tab}
          >
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

        {/* Заголовок */}
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
            style={[styles.submitText, email.length === 0 && { color: "#aaa" }]}
          >
            {activeTab === "signup" ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or with</Text>
          <View style={styles.line} />
        </View>

        {/* Social buttons */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/google.png")} // логотип Google
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/facebook.png")} // логотип Facebook
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  logo: {
    width: 180,
    height: 100,
    marginTop: 40,
    marginBottom: 10,
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
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
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
});
