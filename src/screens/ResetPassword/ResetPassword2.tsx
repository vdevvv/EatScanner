import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CODE_LENGTH = 5;

export default function VerifyCodeScreen() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.replace(/\D/g, ""); // тільки цифри
    setCode(newCode);

    if (text && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isFilled = code.every((digit) => digit !== "");

  const handleVerify = () => {
    alert(`Entered code: ${code.join("")}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Назад */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={22} color="black" />
      </TouchableOpacity>

      {/* Контент */}
      <View style={styles.content}>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          We sent a reset link to example@gmail.com{"\n"}
          Enter the 5 digit code mentioned in the email
        </Text>

        <View style={styles.codeContainer}>
          {code.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.codeInput}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isFilled && styles.buttonActive]}
          disabled={!isFilled}
          onPress={handleVerify}
        >
          <Text
            style={[styles.buttonText, isFilled && styles.buttonTextActive]}
          >
            Verify Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
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
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "85%",
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    fontSize: 20,
    color: "#000",
  },
  button: {
    width: "85%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
