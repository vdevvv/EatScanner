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

type CreatePasswordScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function CreatePasswordScreen() {
  const navigation = useNavigation<CreatePasswordScreenNavigationProp>();

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
      navigation.navigate("SignUp");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
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
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons
              name="logo-google"
              size={20}
              color="#DB4437"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons
              name="logo-facebook"
              size={20}
              color="#4267B2"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.socialText}>Continue with Facebook</Text>
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
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },
  content: {
    width: "85%",
    alignItems: "center",
    marginTop: -10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  tabText: {
    fontSize: 16,
    paddingVertical: 6,
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
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    color: "#777",
    textAlign: "center",
    marginBottom: 12,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 44,
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 13,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#aaa",
    marginRight: 8,
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
  },
  createButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
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
    marginBottom: 14,
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
    paddingVertical: 12,
    marginBottom: 8,
  },
  socialText: {
    fontSize: 15,
    color: "#333",
  },
});
