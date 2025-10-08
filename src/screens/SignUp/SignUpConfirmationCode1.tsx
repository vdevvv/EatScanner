// screens/ConfirmCodeScreen.tsx
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
  TextInput as RNTextInput, // тип для рефів
} from "react-native";

const CODE_LENGTH = 6;

export default function ConfirmCodeScreen() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState<number>(20);
  const inputs = useRef<Array<RNTextInput | null>>([]); // <- типізовано

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  const focusNext = (index: number) => {
    const next = inputs.current[index + 1];
    next?.focus();
  };

  const focusPrev = (index: number) => {
    const prev = inputs.current[index - 1];
    prev?.focus();
  };

  const handleChange = (text: string, index: number) => {
    // Якщо вставили відразу кілька символів (paste)
    if (text.length > 1) {
      const chars = text.split("").slice(0, CODE_LENGTH - index);
      const newCode = [...code];
      for (let i = 0; i < chars.length; i++) {
        newCode[index + i] = chars[i];
      }
      setCode(newCode);
      // фокус на наступне вільне поле
      const nextIndex = index + chars.length - 1;
      if (nextIndex < CODE_LENGTH - 1) {
        inputs.current[nextIndex + 1]?.focus();
      } else {
        // якщо останнє поле заповнене — сховати клавіатуру (необов'язково)
        inputs.current[CODE_LENGTH - 1]?.blur();
      }
      return;
    }

    // Одна цифра
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < CODE_LENGTH - 1) {
      focusNext(index);
    }

    // якщо користувач стер символ (натиснув backspace), автоматично фокус на попереднє
    if (!text && index > 0) {
      focusPrev(index);
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    // обробка Backspace на деяких платформах
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      focusPrev(index);
    }
  };

  const isFilled = code.every((c) => c !== "");

  const handleConfirm = () => {
    const joined = code.join("");
    // тут валідація / запит на сервер
    alert(`Entered code: ${joined}`);
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
      <Image
        source={require("../../assets/logoScaner.png")} // поклади логотип у assets
        style={styles.logo}
      />

      <View style={styles.tabs}>
        <Text style={[styles.tabText, styles.inactiveTab]}>Sign In</Text>
        <Text style={[styles.tabText, styles.activeTab]}>Sign Up</Text>
      </View>

      <Text style={styles.title}>Enter confirmation code</Text>
      <Text style={styles.subtitle}>
        We’ve sent an SMS with an activation code to your{"\n"}email
        example@gmail.com
      </Text>

      <View style={styles.codeContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }} // зберігаємо реф у масив
            value={value}
            onChangeText={(text) =>
              handleChange(text.replace(/\D/g, ""), index)
            } // тільки цифри
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeInput}
            returnKeyType="done"
            textContentType="oneTimeCode" // iOS автозаповнення
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, isFilled && styles.confirmButtonActive]}
        disabled={!isFilled}
        onPress={handleConfirm}
      >
        <Text style={[styles.confirmText, isFilled && { color: "#fff" }]}>
          Confirm
        </Text>
      </TouchableOpacity>

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

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or with</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Тут можна додати кнопки соцмереж */}
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
    width: 160,
    height: 50,
    resizeMode: "contain",
    marginBottom: 24,
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
    marginTop: 18,
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
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
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
    marginBottom: 10,
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
});
