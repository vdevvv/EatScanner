import React, { FC, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';

interface MealCardProps {
  shouldPlay: boolean;
  item: {
    video: string | null;
    image: string
    title: string;
    restaurant: string
  };
}

const MealCard: FC<MealCardProps> = ({ item, shouldPlay }) => {
  const hasVideo = !!item.video;

  const player = useVideoPlayer(
    hasVideo ? item.video : null,
    (player) => {
      if (player) {
        player.muted = true;
        player.loop = true;
      }
    },
  );

  useEffect(() => {
    if (!player) return;

    if (shouldPlay) player.play();
    else player.pause();
  }, [shouldPlay, player]);

  return (
    <TouchableOpacity style={styles.cardContainer}>
      {hasVideo ? (
        <VideoView
          player={player}
          style={styles.videoCard}
          contentFit="cover"
          nativeControls={false}
        />
      ) : (
        <Image
          source={{ uri: item.image }}
          style={styles.videoCard}
          resizeMode="cover"
        />
      )}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,.4)']}
        style={styles.gradient}
      />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardRestaurant}>
          <Ionicons name="home-outline" size={14} color="#fff" />
          <Text style={styles.cardRestaurantText}>{item.restaurant}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 220,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: '#ddd',
  },
  gradient: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
  },
  videoCard: { width: '100%', height: '100%', borderRadius: 15 },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#fff' },
  cardRestaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardRestaurantText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 3,
  },
});

export default React.memo(MealCard);
