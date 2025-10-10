import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PasswordResetScreen() {
  const handleConfirm = () => {
    // Наприклад, перехід до Create New Password
    console.log("Confirm pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={22} color="black" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Password reset</Text>
        <Text style={styles.subtitle}>
          Your password has been successfully reset.{"\n"}
          Click confirm to set a new password.
        </Text>

        {/* Confirm Button */}
        <View style={styles.form}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    width: "85%", // 👈 кнопка має однакову ширину, як у ForgotPasswordScreen
    marginTop: 40,
  },
  confirmButton: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#C56B57", // той самий колір, що в ForgotPasswordScreen активної кнопки
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
