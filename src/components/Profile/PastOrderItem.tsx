import React from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../../constants/colors";
import {Feather} from "@expo/vector-icons";

type PastOrderItemProps = {
  image: string;
  title: string;
  restaurant: string;
  onPress: () => void;
};

const PastOrderItem = ({image, title, restaurant, onPress}: PastOrderItemProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <ImageBackground
        source={{uri: image}}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.3)"]}
          style={styles.gradient}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <View style={{flexDirection: "row", alignItems: "center", gap: 3}}>
            <Feather name='home' color='white'/>
            <Text style={styles.restaurant}>{restaurant}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    width:  (width - 30) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    overflow: "hidden",
  },
  image: {aspectRatio: 1},
  textWrapper: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white
  },
  restaurant: {
    fontSize: 12,
    color: COLORS.white
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    height: "100%",
  },
});

export default PastOrderItem;
