import React, {FC, useEffect, useRef, useState} from "react";
import {ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, Image, Share} from "react-native";
import {ResizeMode, Video} from "expo-av";
import {Feather} from "@expo/vector-icons";
import GoogleLogo from "../icons/GoogleLogo";
import {MenuItem} from "../../types";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "./VideoWrappep";
import {COLORS} from "../../constants/colors";
import {BlurView} from "expo-blur";

const shareIcon = require("../../assets/Telegram.png");
const saveIcon = require("../../assets/Save.png");
const saveIconRed = require("../../assets/Save-red.png");
const heartIcon = require('../../assets/heart.png')

interface VideoItemProps {
  restaurant: {
    name: string;
    city: string;
    trustpilotRating: string | null
    googleRating: string | null
  };
  menuItem: MenuItem;
  isVisible: boolean;
  isScreenFocused: boolean;
  width: number;
  height: number;
  isSaved: boolean;
}

export type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePageScreen"
>;

const VideoItem: FC<VideoItemProps> = (
  {
    menuItem,
    isVisible,
    isScreenFocused,
    width,
    height,
    restaurant,
    isSaved
  }
) => {
  const navigation = useNavigation<HomePageNavigationProp>();

  const videoRef = useRef<Video>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setIsVideoReady(false);
    setVideoError(false);
  }, [menuItem]);

  useEffect(() => {
    (async () => {
      if (isVisible && isVideoReady && videoRef.current && !videoError) {
        try {
          await videoRef.current.setPositionAsync(0);
        } catch (error) {
          console.log('Video setPosition error:', error);
        }
      }
    })();
  }, [isVisible, isVideoReady, videoError]);

  const onShare = () => {
    void Share.share({
      message: restaurant.name,
      url: ''
    });
  }

  return (
    <View style={{width, height}}>
      <Video
        ref={videoRef}
        source={{uri: menuItem.video}}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isScreenFocused && isVisible && !videoError}
        onReadyForDisplay={() => {
          setIsVideoReady(true);
          setVideoError(false);
        }}
        onError={(error) => {
          console.error('Video loading error:', error);
          setVideoError(true);
          setIsVideoReady(false);
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{menuItem.name}</Text>
        <View>
          <Text style={styles.restaurantTitle}>{restaurant.name}</Text>

          <View style={styles.footerLocation}>
            <Feather name="map-pin" color={COLORS.white} size={16}/>
            <Text style={styles.locationText}>{restaurant.city}</Text>
            <Text style={styles.distance}>3 miles</Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBox}>
              <Feather name="star" size={14} color={COLORS.white}/>
              <Text style={styles.ratingText}>{restaurant.trustpilotRating} Rating</Text>
            </View>
            <View style={styles.ratingBox}>
              <GoogleLogo width={14} height={14}/>
              <Text style={styles.ratingText}>{restaurant.googleRating} Rating</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.viewDishButton, { overflow: 'hidden' }]}
              onPress={() => navigation.navigate("Order")}
            >
              <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill} />

              <Text style={styles.viewDishText}>View Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.orderNowButton]}
              onPress={() => navigation.navigate("DishDetailScreen")}
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
  distance: {
    color: COLORS.white,
    opacity: 0.8,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  ratingText: {
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