import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "./onBoarding.styles";

type OnBoarding1NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OnBoarding1Screen"
>;

const OnBoarding1Screen = () => {
  const navigation = useNavigation<OnBoarding1NavigationProp>();

  const handleContinue = () => {
    navigation.navigate("OnBoarding2Screen");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/on-board-1.png")}
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
          <Text style={styles.title}>Discover Delicious{"\n"}Food Nearby!</Text>

          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, styles.activeBar]}/>
            <View style={styles.progressBar}/>
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

export default OnBoarding1Screen;
