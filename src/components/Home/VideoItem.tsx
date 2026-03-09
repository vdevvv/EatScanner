import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Share, Platform, Image, Alert} from 'react-native';
import {Feather} from '@expo/vector-icons';
import GoogleLogo from '../icons/GoogleLogo';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/colors';
import {BlurView} from 'expo-blur';
import {useVideoPlayer, VideoView} from 'expo-video';
import {HomeNavigationProp} from '../../navigations/app.types';
import {useToggleSave} from '../../hooks/saved';
import SaveIcon from '../icons/SaveIcon';
import Heart from '../icons/Heart';
import ShareIcon from '../icons/ShareIcon';
import {useToggleLike} from '../../hooks/likes';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {getOptimizedVideoUrl, getVideoThumbnail} from "../../utils/helpers";
import {useAuthStore} from "../../stores/useAuthStore";

interface VideoItemProps {
  restaurant: {
    name: string;
    city: string;
    restaurantId: string
  };
  menuItem: {
    id: string,
    name: string,
    price: number,
    description: string | null,
    image: string,
    video: string,
    createdAt: string,
    isLiked: boolean,
    isSaved: boolean
  };
  onItemUpdate: (itemId: string, type: 'like' | 'save') => void;
  isVisible: boolean;
  isScreenFocused: boolean;
  width: number;
  height: number;
  rating: number | null;
  distance: number | undefined;
}

const VideoItem: FC<VideoItemProps> = (
  {
    menuItem,
    isVisible,
    isScreenFocused,
    width,
    height,
    restaurant,
    rating,
    distance,
    onItemUpdate
  },
) => {
  const {bottom} = useSafeAreaInsets()
  const isTablet = width >= 768;
  const overlayContentWidth = isTablet ? Math.min(width, 900) : width;
  const containerPaddingBottom = Platform.OS === 'android' ? 20 : bottom
  const BUTTON_HEIGHT = 56;
  const ICONS_GAP = 20;
  const iconsBottomPosition = containerPaddingBottom + BUTTON_HEIGHT + ICONS_GAP + 50;

  const navigation = useNavigation<HomeNavigationProp>();
  const isGuest = useAuthStore(state => state.isGuest);
  const exitGuestMode = useAuthStore(state => state.exitGuestMode);
  const [videoError, setVideoError] = useState(false);
  const [isSavedLocal, setIsSavedLocal] = useState(menuItem.isSaved);
  const [isLikedLocal, setIsLikedLocal] = useState(menuItem.isLiked);

  const {mutate: saveMutate} = useToggleSave();
  const {mutate: likeMutate} = useToggleLike();

  useEffect(() => setIsSavedLocal(menuItem.isSaved), [menuItem.isSaved]);
  useEffect(() => setIsLikedLocal(menuItem.isLiked), [menuItem.isLiked]);

  const shouldMountVideo = isVisible && isScreenFocused && !videoError;

  const onShare = () => {
    void Share.share({
      message: restaurant.name,
      url: '',
    });
  };

  const handleSavePress = () => {
    if (isGuest) {
      Alert.alert('Sign In Required', 'Please sign in to save items.', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Sign In', onPress: exitGuestMode},
      ]);
      return;
    }

    setIsSavedLocal(prev => !prev);
    onItemUpdate(menuItem.id, 'save');
    saveMutate(menuItem.id, {
      onError: () => {
        setIsSavedLocal(prev => !prev);
        onItemUpdate(menuItem.id, 'save');
      },
    });
  };

  const handleLikePress = () => {
    if (isGuest) {
      Alert.alert('Sign In Required', 'Please sign in to like items.', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Sign In', onPress: exitGuestMode},
      ]);
      return;
    }

    setIsLikedLocal(prev => !prev);
    onItemUpdate(menuItem.id, 'like');
    likeMutate(menuItem.id, {
      onError: () => {
        setIsLikedLocal(prev => !prev);
        onItemUpdate(menuItem.id, 'like');
      },
    });
  };

  return (
    <View style={{width, height}}>
      <Image
        source={{uri: getVideoThumbnail(menuItem.video) || menuItem.image}}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      {shouldMountVideo && (
        <ActiveFeedPlayer
          videoUrl={getOptimizedVideoUrl(menuItem.video, 'medium')}
          onError={() => setVideoError(true)}
        />
      )}
      <View
        style={[
          styles.contentContainer,
          {
            width: overlayContentWidth,
            alignSelf: 'center',
            paddingBottom: containerPaddingBottom,
          },
        ]}
      >
        <Text style={styles.title}>{menuItem.name}</Text>
        <View>
          <Text style={styles.restaurantTitle}>{restaurant.name}</Text>

          <View style={styles.footerLocation}>
            <Feather name="map-pin" color={COLORS.white} size={16}/>
            <Text style={styles.locationText}>{restaurant.city}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{distance} miles</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.badge}>
              <GoogleLogo width={14} height={14}/>
              <Text style={styles.badgeText}>{rating} Rating</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.viewDishButton, {overflow: 'hidden'}]}
              onPress={() => navigation.navigate('Order', {
                restaurant: {
                  id: restaurant.restaurantId,
                  distance,
                  googleRating: rating,
                  name: restaurant.name,
                  city: restaurant.city,
                  description: '',
                },
              })}
            >
              <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill}/>

              <Text style={styles.viewDishText}>View Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.orderNowButton]}
              onPress={() => {
                navigation.navigate('DishDetailScreen', {
                  menuItemId: menuItem.id,
                });
              }}
            >
              <Text style={styles.orderNowText}>
                Order Now | AED {menuItem.price}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.sideIcons, {bottom: iconsBottomPosition, right: isTablet ? 28 : 20}]}>
          <TouchableOpacity style={styles.sideIconItem} onPress={onShare}>
            <ShareIcon/>
            <Text style={styles.sideIconText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideIconItem} onPress={handleSavePress}>
            {isSavedLocal ? <SaveIcon fill="red"/> : <SaveIcon/>}
            <Text style={styles.sideIconText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideIconItem} onPress={handleLikePress}>
            {isLikedLocal ? <Heart fill={COLORS.red}/> : <Heart/>}
            <Text style={styles.sideIconText}>Like</Text>
          </TouchableOpacity>

        </View>
      </View>

      {videoError && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {justifyContent: 'center', alignItems: 'center', padding: 20},
          ]}>
          <Text style={{color: COLORS.white, fontSize: 16, textAlign: 'center'}}>
            Failed to load video.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingHorizontal: 20,
    pointerEvents: 'box-none',
    height: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  restaurantTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  locationText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  actionButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDishButton: {
    paddingHorizontal: 27,
    backgroundColor: `${COLORS.red}35`,
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: 12,
  },
  viewDishText: {fontSize: 16, fontWeight: 'bold', color: COLORS.white},
  orderNowButton: {flex: 1, backgroundColor: COLORS.red},
  orderNowText: {fontSize: 16, fontWeight: 'bold', color: COLORS.white},
  sideIcons: {
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  sideIconItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  sideIconText: {
    color: COLORS.white,
    marginTop: 5,
  },
});

export default VideoItem;

interface ActiveFeedPlayerProps {
  videoUrl: string,
  onError: () => void
}

const ActiveFeedPlayer: FC<ActiveFeedPlayerProps> = ({videoUrl, onError}) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.muted = false;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener('statusChange', (status) => {
      if (status.status === 'error') {
        onError();
      }
    });
    return () => subscription.remove();
  }, [player]);

  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFill}
      contentFit="cover"
      nativeControls={false}
    />
  );
};
