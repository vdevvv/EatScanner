import {FC} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

interface RatingPillProps {
  iconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap;
  text: string;
  color: string;
  isMaterial?: boolean;
}

const RatingPill: FC<RatingPillProps> = ({ iconName, text, color, isMaterial = false }) => (
  <View style={styles.ratingPillContainer}>
    <View style={[styles.ratingIconWrapper, { backgroundColor: color }]}>
      {isMaterial ? (
        <MaterialIcons
          name={iconName as keyof typeof MaterialIcons.glyphMap}
          size={14}
          color="white"
        />
      ) : (
        <Ionicons
          name={iconName as keyof typeof Ionicons.glyphMap}
          size={14}
          color="white"
        />
      )}
    </View>
    <Text style={styles.ratingPillText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  ratingPillContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  ratingIconWrapper: {
    padding: 4,
    borderRadius: 15,
    marginRight: 4,
  },
  ratingPillText: { color: "#333", fontSize: 12, fontWeight: "600" },
})

export default RatingPill;