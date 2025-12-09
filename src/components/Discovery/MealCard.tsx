import React, {FC, memo, useEffect, useState} from 'react';
import {Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useVideoPlayer, VideoView} from 'expo-video';
import {LinearGradient} from 'expo-linear-gradient';
import {getOptimizedVideoUrl} from "../../utils/helpers";

interface MealCardProps {
  shouldPlay: boolean;
  handleCardPress: () => void;
  item: {
    video: string | null;
    image: string;
    title: string;
    restaurant: string;
  };
  cardStyles?: StyleProp<ViewStyle>;
}

const MealCard: FC<MealCardProps> = ({item, shouldPlay, handleCardPress, cardStyles}) => {
  const [allowVideoPlay, setAllowVideoPlay] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (shouldPlay) {
      timer = setTimeout(() => {
        setAllowVideoPlay(true);
      }, 250);
    } else {
      setAllowVideoPlay(false);
    }

    return () => clearTimeout(timer);
  }, [shouldPlay]);

  const showVideo = allowVideoPlay && item.video;

  return (
    <TouchableOpacity style={[styles.cardContainer, cardStyles]} onPress={handleCardPress}>
      <Image
        source={{uri: item.image}}
        style={styles.media}
        resizeMode="cover"
      />

      {showVideo && <ActiveVideo videoSource={item.video!}/>}

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,.6)']}
        style={styles.gradient}
      />

      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.cardRestaurant}>
          <Ionicons name="home-outline" size={14} color="#fff"/>
          <Text style={styles.cardRestaurantText} numberOfLines={1}>{item.restaurant}</Text>
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
    backgroundColor: '#ddd',
  },
  media: {width: '100%', height: '100%', borderRadius: 15},
  gradient: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  cardTitle: {fontSize: 14, fontWeight: '600', color: '#fff'},
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

export default memo(MealCard);

const ActiveVideo = ({videoSource}: { videoSource: string }) => {
  const player = useVideoPlayer(getOptimizedVideoUrl(videoSource), (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFill}
      contentFit="cover"
      nativeControls={false}
    />
  );
};