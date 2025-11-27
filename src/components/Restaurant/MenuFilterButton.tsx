import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const MenuFilterButton: React.FC<{
  icon: string;
  label: string;
  isActive: boolean;
}> = ({ icon, label, isActive }) => (
  <TouchableOpacity
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
  >
    <Text style={styles.filterIcon}>{icon}</Text>
    <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  filterButtonActive: { backgroundColor: "#FBE6E3" },
  filterIcon: { fontSize: 18, marginRight: 5 },
  filterLabel: { fontSize: 14, fontWeight: "500", color: "#666" },
  filterLabelActive: { color: "#E57373", fontWeight: "700" },
})

export default MenuFilterButton;