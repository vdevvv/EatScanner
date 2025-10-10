import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // імпорт стеку з App.tsx

const foodImages = [
  require("../../assets/OnBoarding3.jpg"),
  require("../../assets/OnBoarding3Two.jpg"),
  require("../../assets/OnBoarding3Three.jpg"),
  require("../../assets/OnBoarding3Four.jpg"),
  require("../../assets/OnBoarding3Five.jpg"),
  require("../../assets/OnBoarding3Six.jpg"),
  require("../../assets/OnBoarding3seven.jpg"),
  require("../../assets/OnBoarding3Eight.jpg"),
];

type OnBoarding3NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OnBoarding3Screen"
>;

const OnBoarding3Screen: React.FC = () => {
  const navigation = useNavigation<OnBoarding3NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("OnBoarding4Screen"); // перехід на наступний екран
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Верхня частина — фото */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageGrid}>
          {foodImages.map((img, index) => (
            <Image key={index} source={img} style={styles.foodImage} />
          ))}
        </View>
      </ScrollView>

      {/* Нижня частина з текстом, індикаторами та кнопкою */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Discover Delicious{"\n"}Food Nearby!</Text>

        {/* Індикатори прогресу */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
          <View style={[styles.progressBar, styles.activeBar]} />
          <View style={styles.progressBar} />
        </View>

        {/* Кнопка Continue */}
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
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  foodImage: {
    width: "50%", // 2 зображення в ряд
    height: 180,
  },

  // --- Нижня частина ---
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: "center",
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
