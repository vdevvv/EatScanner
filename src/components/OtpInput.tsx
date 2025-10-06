import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface OtpInputProps {
  length: number;
  onCodeChange: (code: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onCodeChange }) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));

  // 💡 ВИПРАВЛЕННЯ TS: Явне типізування useRef для масиву TextInput
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);

    setCode(newCode);
    onCodeChange(newCode.join(""));

    // Автоматичний перехід до наступного поля
    if (text !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Якщо натиснуто Backspace і поточне поле порожнє, переходимо до попереднього
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => handleTextChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={digit}
          // 💡 ВИПРАВЛЕННЯ TS: Присвоєння референсу
          ref={(ref) => (inputRefs.current[index] = ref)}
          caretHidden={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 300,
    marginBottom: 40,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default OtpInput;
