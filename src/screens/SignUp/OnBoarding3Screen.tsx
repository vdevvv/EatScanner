import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "./onBoarding.styles";

type OnBoarding3NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OnBoarding3Screen"
>;

const OnBoarding3Screen = () => {
  const navigation = useNavigation<OnBoarding3NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("OnBoarding4Screen");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/on-board-2.png")}
          style={styles.image}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.3)", "white"]}
          style={styles.gradient}
          locations={[0, 0.75, 1]}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <Text style={styles.title}>See What Your Friends Are Enjoying!</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}/>
            <View style={styles.progressBar}/>
            <View style={[styles.progressBar, styles.activeBar]}/>
            <View style={styles.progressBar}/>
            <View style={styles.progressBar}/>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnBoarding3Screen;
