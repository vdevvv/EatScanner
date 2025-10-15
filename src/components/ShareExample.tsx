import React from "react";
import {
  View,
  Button,
  Share,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

const ShareExample = () => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        title: "Fruit Pancake - A Mano",
        message: "Check out this dish on Eatscanner 🍰 https://eatscanner.com",
        url: "https://eatscanner.com",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Share Dish" onPress={handleShare} color="#E9725C" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ShareExample;
