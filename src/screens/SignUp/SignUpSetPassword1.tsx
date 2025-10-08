// screens/CreatePasswordScreen.tsx
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreatePasswordScreen() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const isValid =
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password === repeatPassword &&
    accepted;

  const handleSubmit = () => {
    alert("✅ Password created successfully!");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Logo */}
      <Image
        source={require("../../assets/logoScaner.png")}
        style={styles.logo}
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tabText, styles.inactiveTab]}>Sign In</Text>
        <Text style={[styles.tabText, styles.activeTab]}>Sign Up</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Create your password</Text>
      <Text style={styles.subtitle}>
        Your password must be at least 8 characters,{"\n"}including a number and
        a symbol.
      </Text>

      {/* Password input */}
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

      {/* Repeat password input */}
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

      {/* Create Password Button */}
      <TouchableOpacity
        disabled={!isValid}
        onPress={handleSubmit}
        style={[styles.createButton, isValid && styles.createButtonActive]}
      >
        <Text style={[styles.createText, isValid && { color: "#fff" }]}>
          Create Password
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or with</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Button */}
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons
          name="logo-google"
          size={20}
          color="#DB4437"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Facebook Button */}
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons
          name="logo-facebook"
          size={20}
          color="#4267B2"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  logo: {
    width: 230,
    height: 250,
    resizeMode: "contain",
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 24,
  },
  tabText: {
    fontSize: 16,
    paddingVertical: 8,
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
    fontSize: 18,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 6,
  },
  subtitle: {
    color: "#777",
    textAlign: "center",
    marginBottom: 18,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 12,
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
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },
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
  createButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
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
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#999",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: "100%",
    paddingVertical: 14,
    marginBottom: 10,
  },
  socialText: {
    fontSize: 15,
    color: "#333",
  },
});
