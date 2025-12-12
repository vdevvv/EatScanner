import React, {FC, useState} from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import Heart from '../icons/Heart';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

interface FavoritesCardProps {
  handleBookmarkPress?: () => void;
  handleCardPress: () => void;
  dishName: string;
  restaurant: string;
  image: string;
}

const FavoritesCard: FC<FavoritesCardProps> = (
  {
    dishName,
    restaurant,
    image,
    handleCardPress,
    handleBookmarkPress
  }
) => {
  const [liked, setLiked] = useState(true);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={handleCardPress}
    >
      <ImageBackground
        source={{uri: image}}
        style={styles.image}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.likedContainer}
          onPress={() => {
            if (handleBookmarkPress) {
              setLiked(prev => !prev);
              handleBookmarkPress();
            }
          }}
        >
          {liked
            ? (
              <Heart
                fill={COLORS.red}
                fillOpacity={1}
                stroke="none"
              />
            )
            : <Heart stroke={COLORS.red}/>
          }
        </TouchableOpacity>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,.45)']}
          style={styles.gradient}
        />
        <View style={styles.textOverlay}>
          <Text style={styles.dishName}>{dishName}</Text>
          <View style={styles.restaurantContainer}>
            <Ionicons name="home-outline" size={12} color="#fff"/>
            <Text style={styles.videoRestaurantName}>{restaurant}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: (width - 30) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  likedContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  textOverlay: {
    padding: 8,
  },
  dishName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  videoRestaurantName: {
    fontSize: 10,
    color: COLORS.white,
    marginLeft: 4,
  },
  gradient: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
  },
})

export default FavoritesCard;