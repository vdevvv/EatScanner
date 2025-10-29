import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions, Share,
} from "react-native";
import {ResizeMode, Video} from "expo-av";
import GoogleLogo from "../icons/GoogleLogo";
import {Feather} from "@expo/vector-icons";
import React, {FC, useEffect, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {DishData} from "../restaurantItem";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const shareIcon = require("../../assets/Telegram.png");
const saveIcon = require("../../assets/Save.png");
const saveIconRed = require("../../assets/Save-red.png");
interface VideoWrapperProps {
  item: DishData;
  index: number;
  visibleIndex: number;
  isScreenFocused: boolean;
  toggleSaveDish: (item: DishData) => void;
  isSaved: boolean;
}

export const COLORS = {
  primary: "#E9725C",
  secondary: "#A8574B",
  white: "#FFFFFF",
  text: "#333333",
  textGrey: "#999",
  shadow: "rgba(0, 0, 0, 0.4)",
  background: "#F8F8F8",
};

export type RootStackParamList = {
  HomePageScreen: undefined;
  Discovery: undefined;
  ChatsScreen: undefined;
  FriendsScreen: undefined;
  FriendsProfileFriends: undefined;
  FriendsProfileScreen: undefined;
  ProfileScreen: undefined;
  MyProfileScreen: undefined;
  DishDetailScreen: undefined;
  Order: undefined;
  Notifications: undefined;
};

export type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePageScreen"
>;

const VideoWrapper: FC<VideoWrapperProps> = (
  {
    item,
    index,
    visibleIndex,
    isScreenFocused,
    toggleSaveDish,
    isSaved
  }) => {
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation<HomePageNavigationProp>();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const isVisible = index === visibleIndex;

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    setIsVideoReady(false);
    setVideoError(false);
  }, [item.videoSource]);

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
      message: `${item.title}-${item.restaurant}`,
      url: item.videoSource || undefined,
    });
  }

  return (
    <View style={[styles.container, {width, height}]}>
      <Video
        ref={videoRef}
        source={item.videoSource}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isScreenFocused && isVisible && !videoError}
        onReadyForDisplay={() => {
          setIsVideoReady(true);
          setVideoError(false);
        }}
        onError={(error) => {
          console.error('Video loading error:', item.id, error);
          setVideoError(true);
          setIsVideoReady(false);
        }}
      />

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

      {isVideoReady && !videoError && (
        <>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View>
              <Text style={styles.restaurantTitle}>{item.restaurant}</Text>

              <View style={styles.footerLocation}>
                <Feather name="map-pin" color={COLORS.white} size={16}/>
                <Text style={styles.locationText}>{item.location}</Text>
                <Text style={styles.distance}>{item.distance}</Text>
              </View>

              <View style={styles.ratingRow}>
                <View style={styles.ratingBox}>
                  <Feather name="star" size={14} color={COLORS.white}/>
                  <Text style={styles.ratingText}>{item.rating} Rating</Text>
                </View>
                <View style={styles.ratingBox}>
                  <GoogleLogo width={14} height={14}/>
                  <Text style={styles.ratingText}>{item.userRating} Rating</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.viewDishButton]}
                  onPress={() => navigation.navigate("DishDetailScreen")}>
                  <Text style={styles.viewDishText}>View Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.orderNowButton]}
                  onPress={() => navigation.navigate("Order")}>
                  <Text style={styles.orderNowText}>
                    Order Now | AED {item.price}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          <View style={styles.sideIcons}>
            <TouchableOpacity style={styles.sideIconItem} onPress={onShare}>
              <Image source={shareIcon} style={{}} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sideIconItem}
              onPress={() => toggleSaveDish(item)}
            >
              <Image source={isSaved ? saveIconRed : saveIcon} style={{}} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const areEqual = (prevProps: VideoWrapperProps, nextProps: VideoWrapperProps) => {
  const prevIsVisible = prevProps.index === prevProps.visibleIndex;
  const nextIsVisible = nextProps.index === nextProps.visibleIndex;

  return (
    prevProps.item.id === nextProps.item.id &&
    prevIsVisible === nextIsVisible &&
    prevProps.isScreenFocused === nextProps.isScreenFocused &&
    prevProps.isSaved === nextProps.isSaved
  );
};

export default React.memo(VideoWrapper, areEqual);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 90,
    paddingHorizontal: 20,
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
    flex: 1,
    backgroundColor: "rgba(233,114,92,0.3)",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  viewDishText: {fontSize: 16, fontWeight: "bold", color: COLORS.white},
  orderNowButton: {flex: 1, backgroundColor: COLORS.primary},
  orderNowText: {fontSize: 16, fontWeight: "bold", color: COLORS.white},

  sideIcons: {
    position: 'absolute',
    right: 20,
    top: 100,
    bottom: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideIconItem: {
    marginBottom: 25,
  },
});