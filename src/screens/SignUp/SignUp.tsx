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

  const isValid = email.includes("@") && password.length >= 6 && accepted;

  const handleSubmit = () => {
    if (isValid) {
      navigation.navigate("HomePageScreen");
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
          {/* Title */}
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

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate("ResetPassword1")}
          >
            <Text style={styles.forgotPasswordText}>
              Forget your password?{" "}
              <Text style={styles.resetPasswordText}>Reset Password</Text>
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  logoContainer: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    marginLeft: 25,
    zIndex: 10,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    marginTop: 210,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
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
    marginBottom: 15,
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
    marginTop: 10,
    marginBottom: 30,
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
  signUpButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  resetPasswordText: {
    color: "#000",
    fontWeight: "600",
  },
});
