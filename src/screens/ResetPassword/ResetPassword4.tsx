import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Типи для навігації
type RootStackParamList = {
  ResetPassword4: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

type ResetPassword4NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword4"
>;

export default function SuccessScreen() {
  const navigation = useNavigation<ResetPassword4NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("SignIn");
  };

  const handleBack = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Кнопка назад */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={22} color="black" />
      </TouchableOpacity>

      {/* Контент */}
      <View style={styles.content}>
        <Text style={styles.title}>Successful</Text>
        <Text style={styles.subtitle}>
          Congratulations! Your password has been changed.{"\n"}Click continue
          to login
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    marginTop: 40,
    width: "90%",
    height: 50,
    backgroundColor: "#C56B57",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
