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
import {AuthStackParamList} from "../../navigations/AuthNavigator";
import {COLORS} from "../../constants/colors";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const ShareContactsScreen = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleContinue = () => {
    if (!selected) return;
    navigation.navigate("Auth", {initialTab: 'signUp'});
  };

  const isContinueDisabled = !selected;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              How would you like{"\n"}to share contacts?
            </Text>
            <Text style={styles.subtitle}>
              Selecting contacts lets you pick the ones you want to share with
              us. You can share more anytime.
            </Text>
          </View>
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

        <View style={styles.footerContainer}>
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.activeDot]} />
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
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.black,
    lineHeight: 21,
  },
  optionsContainer: {
    marginTop: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.stroke1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: COLORS.white,
  },
  optionSelected: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.black,
  },
  optionLabel: {
    fontSize: 14,
    color: COLORS.black,
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
    backgroundColor: COLORS.grey20,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.red,
  },
  continueButton: {
    backgroundColor: COLORS.red,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: COLORS.stroke1,
  },
  continueText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  continueTextDisabled: {
    color: COLORS.grey30,
  },
});
