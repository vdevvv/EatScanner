import React, {FC} from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MenuItem} from "../../types";
import {LinearGradient} from "expo-linear-gradient";

interface HighlightedItemProps {
  item: MenuItem
  restaurantName: string
}

const { width } = Dimensions.get("window");

const HighlightedCard: FC<HighlightedItemProps> = ({ item, restaurantName }) => (
  <TouchableOpacity style={styles.highlightedCard}>
    <Image source={{uri: item.image}} style={styles.highlightedImage} />
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,.4)"]}
      style={styles.gradient}
    />
    <View style={styles.highlightedTextOverlay}>
      <Text style={styles.highlightedTitle}>{item.name}</Text>
      <Text style={styles.highlightedSubtitle}>{restaurantName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
  },
  highlightedCard: {
    width: width * 0.45,
    height: width * 0.6,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
  },
  highlightedImage: { width: "100%", height: "100%", resizeMode: "cover" },
  highlightedTextOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  highlightedTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  highlightedSubtitle: { color: "#eee", fontSize: 12 },
})

export default HighlightedCard;