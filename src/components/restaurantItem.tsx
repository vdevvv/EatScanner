import {ResizeMode, Video} from "expo-av";
import React, {FC, useRef} from 'react';
import {Dimensions, ImageSourcePropType, StyleSheet, View} from "react-native";

interface RestaurantItemProps {
  item: DishData
}

export interface DishData {
  id: string;
  title: string;
  restaurant: string;
  location: string;
  distance: string;
  rating: number;
  userRating: number;
  price: number;
  imageSource: ImageSourcePropType;
  videoSource: string
}

const RestaurantItem: FC<RestaurantItemProps> = ({item}) => {
  const videoRef = useRef<Video>(null);
  const {height} = Dimensions.get("screen");

  return (
    <View style={{height}}>
      <Video
        style={StyleSheet.absoluteFill}
        ref={videoRef}
        source={{uri: item.videoSource}}
        resizeMode={ResizeMode.COVER}
        isLooping

      />
    </View>
  );
};

export default RestaurantItem;