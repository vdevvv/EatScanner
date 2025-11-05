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
      <Image
        source={require("../../assets/OnBoarding2.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Order in one Tap!</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
          <View style={[styles.progressBar, styles.activeBar]} />
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

export default OnBoarding2Screen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 440,
    height: 510,
    marginTop: 0,
  },
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
