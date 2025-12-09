import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import { COLORS } from '../../constants/colors';
import SaveIcon from '../icons/SaveIcon';
import { LinearGradient } from 'expo-linear-gradient';

interface SavedCardProps {
  dishName: string;
  restaurant: string;
  image: string;
  handleCardPress: () => void;
  handleBookmarkPress: () => void;
}

const SavedCard: FC<SavedCardProps> = (
  {
    dishName,
    restaurant,
    image,
    handleCardPress,
    handleBookmarkPress,
  }) => {
  const [saved, setSaved] = useState(true);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={handleCardPress}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.bookmarkContainer}
          onPress={() => {
            setSaved(prev => !prev);
            handleBookmarkPress();
          }}
        >
          {saved
            ? (
              <SaveIcon
                fill={COLORS.red}
                fillOpacity={1}
                stroke="none"
              />
            )
            : <SaveIcon stroke={COLORS.red} />
          }
        </TouchableOpacity>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,.45)']}
          style={styles.gradient}
        />
        <View style={styles.textOverlay}>
          <Text style={styles.dishName}>{dishName}</Text>
          <View style={styles.restaurantContainer}>
            <Ionicons name="home-outline" size={12} color="#fff" />
            <Text style={styles.videoRestaurantName}>{restaurant}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width:  (width - 30) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bookmarkContainer: {
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
});

export default SavedCard;