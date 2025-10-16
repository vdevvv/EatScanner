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
      navigation.navigate("HomePage");
    } else {
      alert("❌ Please fill all fields correctly!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.activeTab]}>Sign Up</Text>
          <Text style={[styles.tabText, styles.inactiveTab]}>Sign In</Text>
        </View>

        {/* Title */}
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

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or with</Text>
          <View style={styles.line} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => navigation.navigate("SignUpSetPassword1")}
        >
          <Image
            source={require("../../assets/google.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => navigation.navigate("SignUpSetPassword1")}
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
  signUpButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  signUpButtonActive: {
    backgroundColor: "#D06B5C",
  },
  signUpText: {
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
  line: {
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
});
