import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // 👈 Імпорт типів навігації з App.tsx

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ShareContactsScreen = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleContinue = () => {
    if (!selected) return;
    navigation.navigate("CheckEmailscreen"); // 👈 зміни назву на потрібну цільову сторінку
  };

  const isContinueDisabled = !selected;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Верхня частина */}
        <View>
          {/* Заголовок */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              How would you like{"\n"}to share contacts?
            </Text>
            <Text style={styles.subtitle}>
              Selecting contacts lets you pick the ones you want to share with
              us. You can share more anytime.
            </Text>
          </View>

          {/* Опції */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                selected === "select" && styles.optionSelected,
              ]}
              onPress={() => handleSelect("select")}
            >
              <View style={styles.radioCircle}>
                {selected === "select" && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.optionLabel}>Select Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                selected === "full" && styles.optionSelected,
              ]}
              onPress={() => handleSelect("full")}
            >
              <View style={styles.radioCircle}>
                {selected === "full" && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.optionLabel}>Allow Full Access</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Нижня частина — прогрес і кнопка */}
        <View style={styles.footerContainer}>
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.activeDot]} />
            <View style={styles.progressDot} />
          </View>

          <TouchableOpacity
            disabled={isContinueDisabled}
            onPress={handleContinue}
            style={[
              styles.continueButton,
              isContinueDisabled && styles.disabledButton,
            ]}
          >
            <Text
              style={[
                styles.continueText,
                isContinueDisabled && styles.continueTextDisabled,
              ]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShareContactsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 21,
  },
  optionsContainer: {
    marginTop: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  optionSelected: {
    borderColor: "#E57373",
    backgroundColor: "#FFF5F3",
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#E57373",
  },
  optionLabel: {
    fontSize: 16,
    color: "#222",
  },
  footerContainer: {
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  progressDot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#eee",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#E57373",
  },
  continueButton: {
    backgroundColor: "#E57373",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#f2f2f2",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  continueTextDisabled: {
    color: "#aaa",
  },
});
