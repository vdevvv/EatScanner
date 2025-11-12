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

interface VideoWrapperProps {
  item: RestaurantResponse;
  index: number;
  visibleIndex: number;
  isScreenFocused: boolean;
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

const VideoWrapper: FC<VideoWrapperProps> = (
  {
    item,
    index,
    visibleIndex,
    isScreenFocused,
    isSaved
  }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isVisible = index === visibleIndex;
  const videoFlatListRef = useRef<FlatList>(null);

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

  const getItemLayoutVideo = (_data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

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

  return (
    <View style={[styles.container, {width, height}]}>
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
        ref={videoFlatListRef}
        data={menuItems}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, idx) => `${item.id}-video-${idx}`}
        renderItem={({item: menuItem, index}) => (
          <VideoItem
            restaurant={{
              name: item.name,
              trustpilotRating: item.trustpilotRating,
              googleRating: item.googleRating,
              city: item.city,
            }}
            menuItem={menuItem}
            isVisible={isVisible && index === currentVideoIndex}
            isScreenFocused={isScreenFocused}
            width={width}
            height={height}
            isSaved={isSaved}
          />
        )}
        getItemLayout={getItemLayoutVideo}
        onViewableItemsChanged={onViewableItemsChangedVideo}
        viewabilityConfig={viewabilityConfigVideo}
        snapToInterval={width}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEnabled={videos.length > 1}
        removeClippedSubviews={false}
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
    prevProps.isSaved === nextProps.isSaved
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
  topActiveBar: {backgroundColor: COLORS.primary,},
});