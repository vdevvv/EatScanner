import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи для навігації
type RootStackParamList = {
  ResetPassword1: undefined;
  ResetPassword2: undefined;
  SignUp: undefined;
};

type ResetPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword1"
>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ResetPasswordNavigationProp>();
  const [email, setEmail] = useState("");

  const isEmailEntered = email.trim().length > 0;

  const handleResetPassword = () => {
    navigation.navigate("ResetPassword2");
  };

  const handleBack = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Назад */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={22} color="black" />
      </TouchableOpacity>

      {/* Контент */}
      <View style={styles.content}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>
          Please enter your email{"\n"}to reset the password
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={[styles.button, isEmailEntered && styles.buttonActive]}
            disabled={!isEmailEntered}
            onPress={handleResetPassword}
          >
            <Text
              style={[
                styles.buttonText,
                isEmailEntered && styles.buttonTextActive,
              ]}
            >
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 10,
  },
  content: {
    marginTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
  },
  form: {
    width: "85%", // 👈 тепер не на всю ширину екрану
    marginTop: 30,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonActive: {
    backgroundColor: "#C56B57",
  },
  buttonText: {
    color: "#A0A0A0",
    fontSize: 15,
    fontWeight: "500",
  },
  buttonTextActive: {
    color: "#FFFFFF",
  },
});
