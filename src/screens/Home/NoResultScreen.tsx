import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // або react-native-vector-icons

const NoMoreResultsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Фон з блюром або затемненням */}
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Кнопка закриття */}
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>

          {/* Текст */}
          <Text style={styles.title}>No More Results</Text>
          <Text style={styles.subtitle}>No more restaurants to show</Text>

          {/* Кнопки */}
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Go To Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Go To Discovery Page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoMoreResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 28,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#D57358", // коралово-червоний як на скріні
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#FFEDE8",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#A65240",
    fontWeight: "600",
    fontSize: 15,
  },
});
