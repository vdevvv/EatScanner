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
import { RootStackParamList } from "../../../App"; // якщо RootStackParamList визначений у App.tsx

const foodImages = [
  require("../../assets/food1.jpg"),
  require("../../assets/food2.jpg"),
  require("../../assets/food3.jpg"),
  require("../../assets/food4.jpg"),
  require("../../assets/food5.jpg"),
  require("../../assets/food6.jpg"),
  require("../../assets/food7.jpg"),
  require("../../assets/food8.jpg"),
];

type OnBoarding2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OnBoarding2Screen"
>;

const OnBoarding2Screen: React.FC = () => {
  const navigation = useNavigation<OnBoarding2NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("OnBoarding3Screen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Сітка зображень */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageGrid}>
          {foodImages.map((img, index) => (
            <Image key={index} source={img} style={styles.foodImage} />
          ))}
        </View>
      </ScrollView>

      {/* Нижня частина */}
      <View style={styles.fixedBottom}>
        <Text style={styles.title}>Find Your Favorite{"\n"}Meals Easily!</Text>

        {/* Прогрес-бар під текстом */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
          <View style={[styles.progressBar, styles.activeBar]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        {/* Кнопка */}
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

export default OnBoarding2Screen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 150,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  foodImage: {
    width: "33.33%",
    height: 120,
  },

  fixedBottom: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: "center",
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
