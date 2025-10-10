import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

// Компонент одного "чіпа" (кнопочки)
const Chip = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.chip, active && styles.chipActive]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Компонент секції (заголовок + чіпи)
const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.chipContainer}>{children}</View>
  </View>
);

export default function FiltersScreen() {
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedSpice, setSelectedSpice] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string[]>([]);

  const toggleSelection = (
    item: string,
    setState: Function,
    currentState: string[]
  ) => {
    if (currentState.includes(item)) {
      setState(currentState.filter((i) => i !== item));
    } else {
      setState([...currentState, item]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.headerTitle}>Filters</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cuisine */}
        <Section title="Cuisine:">
          {[
            "🍝 Italian",
            "🍣 Japanese",
            "🌮 Mexican",
            "🥡 Chinese",
            "🍔 American",
            "🍛 Indian",
            "🥟 Ukrainian",
            "🍜 Thai",
            "🥖 French",
          ].map((item) => (
            <Chip
              key={item}
              label={item}
              active={selectedCuisine.includes(item)}
              onPress={() =>
                toggleSelection(item, setSelectedCuisine, selectedCuisine)
              }
            />
          ))}
        </Section>

        {/* Meal Type */}
        <Section title="Meal Type:">
          {[
            "🍳 Breakfast",
            "🥪 Lunch",
            "🍽 Dinner",
            "🍿 Snack",
            "🍰 Dessert",
            "🌮 Appetizer",
            "🥤 Drink / Smoothie",
            "🍲 Soup / Broth",
          ].map((item) => (
            <Chip
              key={item}
              label={item}
              active={selectedMeal.includes(item)}
              onPress={() =>
                toggleSelection(item, setSelectedMeal, selectedMeal)
              }
            />
          ))}
        </Section>

        {/* Dietary Restrictions */}
        <Section title="Dietary Restrictions:">
          {[
            "🥦 Vegetarian",
            "🌱 Vegan",
            "🌾 Gluten-Free",
            "🥥 No Tree Nuts",
            "🥛 Lactose-Free",
            "🐷 No Pork",
            "🐮 No Beef",
            "🦐 No Shellfish",
            "🍭 No Sweets",
            "🥜 No Peanuts",
          ].map((item) => (
            <Chip
              key={item}
              label={item}
              active={selectedDiet.includes(item)}
              onPress={() =>
                toggleSelection(item, setSelectedDiet, selectedDiet)
              }
            />
          ))}
        </Section>

        {/* Spice Level */}
        <Section title="Spice Level:">
          {["🥛 Mild", "🌶 Medium", "🌶🌶 Spicy", "🌶🌶🌶 Extra Spicy"].map(
            (item) => (
              <Chip
                key={item}
                label={item}
                active={selectedSpice.includes(item)}
                onPress={() =>
                  toggleSelection(item, setSelectedSpice, selectedSpice)
                }
              />
            )
          )}
        </Section>

        {/* Ratings */}
        <Section title="Ratings:">
          {[
            "⭐ 4.5 & up",
            "⭐ 4.0 – 4.4",
            "⭐ 3.5 – 3.9",
            "⭐ All ratings",
          ].map((item) => (
            <Chip
              key={item}
              label={item}
              active={selectedRating.includes(item)}
              onPress={() =>
                toggleSelection(item, setSelectedRating, selectedRating)
              }
            />
          ))}
        </Section>
      </ScrollView>

      {/* Apply Filters Button */}
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply filters</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backArrow: {
    fontSize: 26,
    color: "#222",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipActive: {
    backgroundColor: "#F5D0C8",
    borderColor: "#D06B5C",
  },
  chipText: {
    fontSize: 14,
    color: "#333",
  },
  chipTextActive: {
    color: "#B14434",
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: "#D06B5C",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
