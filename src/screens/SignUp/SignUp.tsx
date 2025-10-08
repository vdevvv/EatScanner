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
      {/* Logo */}
      <Image
        source={require("../../assets/logoScaner.png")}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Discover meals you love.{"\n"}Watch it. Want it. Get it.
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* Password Input */}
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
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 14,
  },
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
    marginTop: 2,
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
  resetContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  resetText: {
    color: "#333",
  },
  resetLink: {
    color: "#000",
    fontWeight: "600",
  },
});
