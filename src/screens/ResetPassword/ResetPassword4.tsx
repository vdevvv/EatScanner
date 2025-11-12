import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../../constants/colors";

type RootStackParamList = {
  ResetPassword4: undefined;
  Auth: undefined;
};

type ResetPassword4NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword4"
>;

export default function SuccessScreen() {
  const navigation = useNavigation<ResetPassword4NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={22} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Successful</Text>
        <Text style={styles.subtitle}>
          Congratulations! Your password has been changed.{"\n"}Click continue
          to login
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Auth")}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginTop: 10,
    marginLeft: 20
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
    color: COLORS.black,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    marginTop: 40,
    width: "90%",
    height: 50,
    backgroundColor: COLORS.red,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
