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

const foodImages = [
  require("../../assets/food1.jpg"),
  require("../../assets/food2.jpg"),
  require("../../assets/food3.jpg"),
  require("../../assets/food4.jpg"),
  require("../../assets/food5.jpg"),
  require("../../assets/food6.jpg"),
  require("../../assets/food7.jpg"),
  require("../../assets/food8.jpg"),
  require("../../assets/food9.jpg"),
];

const OnboardingScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Верхня частина з фотографіями */}
        <View style={styles.imageGrid}>
          {foodImages.map((img, index) => (
            <Image key={index} source={img} style={styles.foodImage} />
          ))}
        </View>

        {/* Нижня частина */}
        <View style={styles.bottomSection}>
          <Text style={styles.title}>Discover Delicious{"\n"}Food Nearby!</Text>

          {/* Індикатори — замість крапок робимо смужки */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, styles.activeBar]} />
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
          </View>

          {/* Кнопка Continue */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

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
    width: "33.33%", // 3 колонки
    height: 120,
  },
  bottomSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginBottom: 30,
  },

  // --- Новий стиль для смужок ---
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
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
