import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import {COLORS} from "../../constants/colors";

type AllergiesScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface Category {
  id: string;
  label: string;
  emoji: string;
}

const categories: Category[] = [
  { id: "1", label: "Vegetarian", emoji: "🥗" },
  { id: "2", label: "Vegan", emoji: "🌱" },
  { id: "3", label: "Gluten-Free", emoji: "🌾" },
  { id: "4", label: "No Tree Nuts", emoji: "🌰" },
  { id: "5", label: "Lactose-Free", emoji: "🥛" },
  { id: "6", label: "No Pork", emoji: "🐷" },
  { id: "7", label: "No Beef", emoji: "🐮" },
  { id: "8", label: "No Shellfish", emoji: "🦐" },
  { id: "9", label: "No Sweets", emoji: "🍰" },
  { id: "10", label: "No Peanuts", emoji: "🥜" },
];

const AllergiesScreen = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigation = useNavigation<AllergiesScreenNavigationProp>(); // 👈 підключення навігації

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 8
        ? [...prev, id]
        : prev
    );
  };

  const isContinueDisabled = selected.length === 0;

  const handleContinue = () => {
    if (!isContinueDisabled) {
      navigation.navigate("OnBoarding5Screen");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            Do you have any{"\n"}allergies or restrictions?
          </Text>
          <Text style={styles.subtitle}>Choose up to 8 categories</Text>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isSelected = selected.includes(item.id);
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => toggleSelect(item.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {item.emoji} {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.progressContainer}>
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            isContinueDisabled && styles.disabledButton,
          ]}
          disabled={isContinueDisabled}
          onPress={handleContinue}
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
    </SafeAreaView>
  );
};

export default AllergiesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  headerContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "left",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.black,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "flex-start",
    gap: 12,
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.stroke1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  optionSelected: {
    backgroundColor: `${COLORS.red}20`,
    borderColor: COLORS.red,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'semibold'
  },
  optionTextSelected: {
    color: COLORS.black,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    alignSelf: "center",
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.red,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
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
