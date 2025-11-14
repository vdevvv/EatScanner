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

type OnBoarding2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OnBoarding2Screen"
>;

const OnBoarding2Screen = () => {
  const navigation = useNavigation<OnBoarding2NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("OnBoarding3Screen");
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
          <Text style={styles.title}>Order in One Tap!</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}/>
            <View style={[styles.progressBar, styles.activeBar]}/>
            <View style={styles.progressBar}/>
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

export default OnBoarding2Screen;
