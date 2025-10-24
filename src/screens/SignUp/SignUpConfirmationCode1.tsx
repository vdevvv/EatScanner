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
  ScrollView,
  SafeAreaView,
  TextInput as RNTextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

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
      navigation.navigate("SignUpSetPassword1");
    }
  };

  const resendCode = () => {
    setTimer(20);
    setCode(Array(CODE_LENGTH).fill(""));
    inputs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 🔹 ЛОГО */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logoScaner.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* 🔹 Основний контент */}
          <View style={styles.content}>
            {/* Верхня частина */}
            <View style={styles.topSection}>
              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignIn")}
                  style={styles.tab}
                >
                  <Text style={[styles.tabText, styles.inactiveTab]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity disabled style={styles.tab}>
                  <Text style={[styles.tabText, styles.activeTab]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Enter confirmation code</Text>
              <Text style={styles.subtitle}>
                We’ve sent an SMS with an activation code to your{"\n"}email
                example@gmail.com
              </Text>

              {/* Поля коду */}
              <View style={styles.codeContainer}>
                {code.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      if (ref) {
                        inputs.current[index] = ref;
                      }
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

              {/* Кнопка підтвердження */}
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  isFilled && styles.confirmButtonActive,
                ]}
                disabled={!isFilled}
                onPress={handleConfirm}
              >
                <Text
                  style={[styles.confirmText, isFilled && { color: "#fff" }]}
                >
                  Confirm
                </Text>
              </TouchableOpacity>

              {/* Таймер */}
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
            </View>

            {/* Нижня частина */}
            <View style={styles.bottomSection}>
              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or with</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../../assets/google.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, styles.lastSocialButton]}
              >
                <Image
                  source={require("../../assets/facebook.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Continue with Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    top: -60,
    width: 280,
    height: 280,
  },
  content: {
    flex: 1,
    marginTop: -80,
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
  },
  bottomSection: {
    alignItems: "center",
    width: "100%",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 30,
  },
  tab: {
    paddingVertical: 6,
    width: "45%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inactiveTab: {
    color: "#888",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    backgroundColor: "#fff",
  },
  confirmButton: {
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    width: "100%",
  },
  confirmButtonActive: {
    backgroundColor: "#C8644D",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#aaa",
  },
  resendText: {
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 14,
    marginTop: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    color: "#888",
    marginHorizontal: 10,
    fontSize: 13,
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
    backgroundColor: "#fff",
    marginBottom: 12,
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
  lastSocialButton: {
    marginBottom: 0,
  },
});
