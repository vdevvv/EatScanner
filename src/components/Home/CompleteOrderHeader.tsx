import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RestaurantHeaderProps {
  image: string;
  dishName: string;
  restaurantName: string;
  rating: number;
}


const RestaurantHeader: FC<RestaurantHeaderProps> = (
  {
    image,
    dishName,
    restaurantName,
    rating,
  },
) => (
  <View style={styles.restaurantHeaderContainer}>
    <Image source={{uri: image}} style={styles.restaurantHeaderImage} />
    <View style={styles.restaurantHeaderText}>
      <Text style={styles.dishName}>{dishName}</Text>
      <Text style={styles.restaurantName}>{restaurantName}</Text>

      <View style={styles.ratingsContainer}>
        <View
          style={[styles.ratingPillContainer, { backgroundColor: '#3f84f8' }]}
        >
          <MaterialIcons name="star" size={14} color="#fff" />
          <Text style={styles.ratingPillText}>{rating}</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  restaurantHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantHeaderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  restaurantHeaderText: { flex: 1 },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  restaurantName: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  ratingsContainer: {
    flexDirection: 'row',
  },
  ratingPillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  ratingPillText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: '#fff',
  },
});

export default RestaurantHeader;