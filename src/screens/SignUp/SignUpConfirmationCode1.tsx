import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // 👈 перевір правильний шлях до App.tsx

const CODE_LENGTH = 6;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUpConfirmationCode1"
>;

export default function SignUpConfirmationCode1() {
  const navigation = useNavigation<NavigationProp>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState<number>(20);
  const inputs = useRef<Array<RNTextInput | null>>([]);

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  const focusNext = (index: number) => inputs.current[index + 1]?.focus();
  const focusPrev = (index: number) => inputs.current[index - 1]?.focus();

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < CODE_LENGTH - 1) focusNext(index);
    if (!text && index > 0) focusPrev(index);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0)
      focusPrev(index);
  };

  const isFilled = code.every((c) => c !== "");

  const handleConfirm = () => {
    if (isFilled) {
      navigation.navigate("SignUpSetPassword1"); // ✅ Перехід на наступний екран
    }
  };

  const resendCode = () => {
    setTimer(20);
    setCode(Array(CODE_LENGTH).fill(""));
    inputs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* 🔹 Лого */}
      <Image
        source={require("../../assets/logoScaner.png")}
        style={styles.logo}
      />

      {/* 🔹 Основний контент */}
      <View style={styles.content}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.inactiveTab]}>Sign In</Text>
          <Text style={[styles.tabText, styles.activeTab]}>Sign Up</Text>
        </View>

        <Text style={styles.title}>Enter confirmation code</Text>
        <Text style={styles.subtitle}>
          We’ve sent an SMS with an activation code to your{"\n"}email
          example@gmail.com
        </Text>

        {/* 🔹 Поля для коду */}
        <View style={styles.codeContainer}>
          {code.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              value={value}
              onChangeText={(text) =>
                handleChange(text.replace(/\D/g, ""), index)
              }
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.codeInput}
              returnKeyType="done"
              textContentType="oneTimeCode"
            />
          ))}
        </View>

        {/* 🔹 Кнопка підтвердження */}
        <TouchableOpacity
          style={[styles.confirmButton, isFilled && styles.confirmButtonActive]}
          disabled={!isFilled}
          onPress={handleConfirm}
        >
          <Text style={[styles.confirmText, isFilled && { color: "#fff" }]}>
            Confirm
          </Text>
        </TouchableOpacity>

        {/* 🔹 Таймер */}
        <TouchableOpacity onPress={resendCode}>
          <Text style={styles.resendText}>
            Send code again{" "}
            {timer > 0 && (
              <Text style={{ color: "#999" }}>
                {timer < 10 ? `00:0${timer}` : `00:${timer}`}
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        {/* 🔹 Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* 🔹 Соцмережі */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
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
    alignItems: "center",
  },

  logo: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    width: 280,
    height: 280,
    resizeMode: "contain",
    zIndex: 10,
  },

  content: {
    marginTop: 260,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 30,
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
    marginTop: 12,
    marginBottom: 6,
  },
  subtitle: {
    color: "#777",
    textAlign: "center",
    marginBottom: 18,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 18,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  confirmButtonActive: {
    backgroundColor: "#D06B5C",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
  },
  resendText: {
    color: "#000",
    marginBottom: 20,
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
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
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
