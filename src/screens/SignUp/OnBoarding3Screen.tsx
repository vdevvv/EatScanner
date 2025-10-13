import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type OnBoarding3NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OnBoarding3Screen"
>;

const OnBoarding3Screen: React.FC = () => {
  const navigation = useNavigation<OnBoarding3NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("OnBoarding4Screen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* 🖼 Один фон замість 8 фото */}
      <Image
        source={require("../../assets/OnBoarding3.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Контент поверх */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Discover Delicious{"\n"}Food Nearby!</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
          <View style={[styles.progressBar, styles.activeBar]} />
          <View style={styles.progressBar} />
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding3Screen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // 🖼 Фон
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 440,
    height: 510,
    marginTop: 0,
  },

  // Контент поверх фону
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
    zIndex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 30,
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  progressBar: {
    width: 25,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
  },

  activeBar: {
    backgroundColor: "#E57373",
  },

  continueButton: {
    backgroundColor: "#E57373",
    borderRadius: 12,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
