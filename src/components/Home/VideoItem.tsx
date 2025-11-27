import React, {FC, useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, Image, Share} from "react-native";
import {Feather} from "@expo/vector-icons";
import GoogleLogo from "../icons/GoogleLogo";
import {MenuItem} from "../../types";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../../constants/colors";
import {BlurView} from "expo-blur";
import {useVideoPlayer, VideoView} from "expo-video";
import {HomeNavigationProp} from "../../navigations/app.types";

const shareIcon = require("../../assets/Telegram.png");
const saveIcon = require("../../assets/Save.png");
const saveIconRed = require("../../assets/Save-red.png");
const heartIcon = require('../../assets/heart.png')

interface VideoItemProps {
  restaurant: {
    name: string;
    city: string;
    menuId: string | null
  };
  menuItem: MenuItem;
  isVisible: boolean;
  isScreenFocused: boolean;
  width: number;
  height: number;
  isSaved: boolean;
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
    isSaved,
    rating,
    distance
  }
) => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const player = useVideoPlayer(menuItem.video, (player) => {
    player.loop = true;
    player.muted = false;
  });

  useEffect(() => {
    setIsVideoReady(false);
    setVideoError(false);
  }, [menuItem]);

  useEffect(() => {
    (async () => {
      if (isVisible && isScreenFocused && !videoError) {
        player.play()
      } else {
        player.pause()
      }
    })();
  }, [isVisible, isScreenFocused, videoError, player]);

  useEffect(() => {
    const subscription = player.addListener('statusChange', (status) => {
      if (status.status === 'readyToPlay') {
        setIsVideoReady(true);
        setVideoError(false);
      } else if (status.status === 'error') {
        console.error('Video loading error:', status.error);
        setVideoError(true);
        setIsVideoReady(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  const onShare = () => {
    void Share.share({
      message: restaurant.name,
      url: ''
    });
  }

  return (
    <View style={{width, height, borderWidth: 2}}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />
      <View style={styles.contentContainer}>
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
              onPress={() => navigation.navigate("Order", {
                menuId: restaurant.menuId,
                restaurant: {
                  distance,
                  googleRating: rating,
                  name: restaurant.name,
                  city: restaurant.city,
                  description: '',
                }
              })}
            >
              <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill}/>

              <Text style={styles.viewDishText}>View Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.orderNowButton]}
              onPress={() => {
                navigation.navigate("DishDetailScreen", {
                  menuItemId: menuItem.id,
                  googleRating: rating,
                  restaurantName: restaurant.name
                })
              }}
            >
              <Text style={styles.orderNowText}>
                Order Now | AED {menuItem.price}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sideIcons}>
          <TouchableOpacity style={styles.sideIconItem} onPress={onShare}>
            <Image source={shareIcon}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sideIconItem}
          >
            <Image source={isSaved ? saveIconRed : saveIcon}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sideIconItem}
          >
            <Image source={heartIcon}/>
          </TouchableOpacity>

        </View>
      </View>

      {!isVideoReady && !videoError && (
        <ActivityIndicator
          size="large"
          color={COLORS.white}
          style={StyleSheet.absoluteFill}
        />
      )}

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
    paddingBottom: 90,
    paddingHorizontal: 20,
    pointerEvents: 'box-none',
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  restaurantTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
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
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
  },
  actionButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDishButton: {
    paddingHorizontal: 27,
    backgroundColor: `${COLORS.red}35`,
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: 12,
  },
  viewDishText: {fontSize: 16, fontWeight: "bold", color: COLORS.white},
  orderNowButton: {flex: 1, backgroundColor: COLORS.red},
  orderNowText: {fontSize: 16, fontWeight: "bold", color: COLORS.white},
  sideIcons: {

    position: 'absolute',
    right: 20,
    top: 100,
    bottom: 90,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  sideIconItem: {
    marginBottom: 25,
  },
})

export default VideoItem;