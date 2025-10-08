import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
    >
      {/* === Images Grid === */}
      <View style={styles.grid}>
        {[
          require("../../assets/img1.jpg"),
          require("../../assets/img2.jpg"),
          require("../../assets/img3.jpg"),
          require("../../assets/img4.jpg"),
          require("../../assets/img5.jpg"),
          require("../../assets/img6.jpg"),
          require("../../assets/img7.jpg"),
        ].map((img, i) => (
          <Image key={i} source={img} style={styles.image} resizeMode="cover" />
        ))}
      </View>

      {/* === Text === */}
      <Text style={styles.title}>Order in One Tap!</Text>

      {/* === Pagination === */}
      <View style={styles.pagination}>
        {[0, 1, 2, 3].map((dot, i) => (
          <View key={i} style={[styles.dot, i === 1 && styles.activeDot]} />
        ))}
      </View>

      {/* === Button === */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: width / 3,
    height: width / 3,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#D9644A",
    width: 24,
  },
  button: {
    backgroundColor: "#D9644A",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
