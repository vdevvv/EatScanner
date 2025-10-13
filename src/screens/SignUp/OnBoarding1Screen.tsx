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

type OnBoarding1NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OnBoarding1Screen"
>;

const OnBoarding1Screen: React.FC = () => {
  const navigation = useNavigation<OnBoarding1NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("OnBoarding2Screen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* 🖼 Один задній фон */}
      <Image
        source={require("../../assets/OnBoarding1.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Контент поверх */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Discover Delicious{"\n"}Food Nearby!</Text>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.activeBar]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
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

export default OnBoarding1Screen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // 🖼 Задній фон — точно 250×250 і не перекриває контент
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 440,
    height: 510,
    marginTop: 0,
  },

  // Контент поверх
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 60,
    zIndex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    borderRadius: 10,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
