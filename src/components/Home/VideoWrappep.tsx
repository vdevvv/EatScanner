import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ViewToken,
} from "react-native";
import React, {FC, useEffect, useRef, useState} from "react";
import {RestaurantResponse} from "../../types";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import VideoItem from "./VideoItem";
import {COLORS} from "../../constants/colors";
import {getDistanceMiles} from "../../utils/getDistance";
import {LocationObjectCoords} from "expo-location";

interface VideoWrapperProps {
  item: RestaurantResponse;
  rating: number | null
  index: number;
  visibleIndex: number;
  isScreenFocused: boolean;
  isSaved: boolean;
  coords: Pick<LocationObjectCoords, 'latitude' | 'longitude'> | null;
}

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

const VideoWrapper: FC<VideoWrapperProps> = (
  {
    item,
    index,
    visibleIndex,
    isScreenFocused,
    isSaved,
    rating,
    coords
  }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isVisible = index === visibleIndex;

  const {width, height} = useWindowDimensions();
  const {top} = useSafeAreaInsets()

  useEffect(() => {
    setCurrentVideoIndex(0);
  }, [item.id]);

  const viewabilityConfigVideo = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const onViewableItemsChangedVideo = useRef((
    {viewableItems}: { viewableItems: ViewToken[] }
  ) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentVideoIndex(viewableItems[0].index);
    }
  }).current;

  const videos = item.menu?.categories
    .flatMap(cat => cat.items)
    .map(i => i.video)
    .filter((v): v is string => !!v) || [];

  const getMenuItems = (restaurant: RestaurantResponse) => {
    return restaurant.menu?.categories
      .flatMap(cat => cat.items)
      .filter(item => item.video && item.video !== '') || [];
  }

  const menuItems = getMenuItems(item);
  const distance = getDistanceMiles({
    lat1: item.latitude,
    lon1: item.longitude,
    lat2: coords?.latitude,
    lon2: coords?.longitude
  })

  return (
    <View style={styles.container}>
      <View style={[styles.topProgressWrapper, {top}]}>
        <View style={styles.topProgressContainer}>
          {videos.length > 1 && videos.map((_, i) => (
            <View
              key={i}
              style={[
                styles.topProgressBar,
                currentVideoIndex === i && styles.topActiveBar,
              ]}
            />
          ))}
        </View>
      </View>
      <FlatList
        data={menuItems}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChangedVideo}
        viewabilityConfig={viewabilityConfigVideo}
        scrollEnabled={videos.length > 1}
        keyExtractor={(_, idx) => `${item.id}-video-${idx}`}
        renderItem={({item: menuItem, index}) => (
          <VideoItem
            distance={distance}
            rating={rating}
            restaurant={{
              name: item.name,
              city: item.city,
              menuId: item.menu?.id ?? null
            }}
            menuItem={menuItem}
            isVisible={isVisible && index === currentVideoIndex}
            isScreenFocused={isScreenFocused}
            width={width}
            height={height}
            isSaved={isSaved}
          />
        )}
      />
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
    prevProps.isSaved === nextProps.isSaved &&
    prevProps.rating === nextProps.rating
  );
};

export default React.memo(VideoWrapper, areEqual);

const styles = StyleSheet.create({
  container: {backgroundColor: '#000'},
  topProgressWrapper: {
    marginTop: 5,
    position: "absolute",
    left: 30,
    right: 30,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    zIndex: 10,
  },
  topProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topProgressBar: {
    flex: 1,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    marginHorizontal: 3,
  },
  topActiveBar: {backgroundColor: COLORS.red},
});