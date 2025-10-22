import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи для навігації
type RootStackParamList = {
  ResetPassword3: undefined;
  ResetPassword4: undefined;
};

type ResetPassword3NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword3"
>;

export default function SetNewPasswordScreen() {
  const navigation = useNavigation<ResetPassword3NavigationProp>();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const isValid = password.length >= 8 && password === repeatPassword; // мінімальна валідація

  const handleSubmit = () => {
    navigation.navigate("ResetPassword4");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Set a new password</Text>
        <Text style={styles.subtitle}>
          Create a new password. Ensure it differs from{"\n"}
          previous ones for security
        </Text>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
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

        {/* Repeat Password Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter password"
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

        {/* Update Password Button */}
        <TouchableOpacity
          style={[styles.button, isValid && styles.buttonActive]}
          disabled={!isValid}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, isValid && { color: "#fff" }]}>
            Update Password
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
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
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 44,
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  button: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  buttonActive: {
    backgroundColor: "#D06B5C",
  },
  buttonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
  },
});
