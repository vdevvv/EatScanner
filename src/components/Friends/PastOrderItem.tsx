import {Dimensions, ImageBackground, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Feather} from "@expo/vector-icons";
import React, {FC} from "react";
import {COLORS} from "../../constants/colors";

const {width} = Dimensions.get("window");

interface OrderItemProps {
  dishName: string;
  restaurant: string;
  image: ImageSourcePropType;
}

const OrderItem: FC<OrderItemProps> = ({dishName, restaurant, image}) => (
  <TouchableOpacity style={styles.orderItemContainer} activeOpacity={0.8}>
    <ImageBackground
      source={image}
      style={styles.orderImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,.3)"]}
        style={styles.gradient}
      />
      <View style={styles.orderTextOverlay}>
        <Text style={styles.orderDishName}>{dishName}</Text>
        <View style={{flexDirection: "row", alignItems: "center", gap: 3}}>
          <Feather name='home' color='white'/>
          <Text style={styles.orderRestaurantName}>{restaurant}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const GRID_ITEM_SIZE = width / 3;

const styles = StyleSheet.create({
  orderItemContainer: {width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE * 1.5},
  orderImage: {flex: 1, justifyContent: "flex-end"},
  orderTextOverlay: {padding: 8},
  orderDishName: {fontSize: 12, fontWeight: "600", color: COLORS.white},
  orderRestaurantName: {fontSize: 10, color: COLORS.white},
  gradient: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    height: "100%",
  },
})

export default OrderItem;