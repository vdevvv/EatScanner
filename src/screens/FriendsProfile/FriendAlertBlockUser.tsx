import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BlockUserScreen() {
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleBlock = () => {
    alert("🚫 User has been blocked");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
          <Ionicons name="arrow-back-outline" size={26} color="#fff" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Block This User?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          They won’t be able to message you or find your profile.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.blockButton} onPress={handleBlock}>
            <Text style={styles.blockText}>Yes, Block</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#121212", // темний фон як на скріні
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: "#2E2E2E",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  blockButton: {
    backgroundColor: "#D06B5C",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  blockText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
