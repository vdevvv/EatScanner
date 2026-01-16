import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ViewToken,
} from 'react-native';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {RestaurantResponse2} from '../../types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VideoItem from './VideoItem';
import {COLORS} from '../../constants/colors';

interface VideoWrapperProps {
  item: RestaurantResponse2;
  rating: number | null;
  index: number;
  visibleIndex: number;
  isScreenFocused: boolean;
  onItemUpdate: (itemId: string, type: 'like' | 'save') => void;

  height: number
}

const VideoWrapper: FC<VideoWrapperProps> = (
  {
    item,
    index,
    visibleIndex,
    isScreenFocused,
    rating,
    onItemUpdate,
    height,
  }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isVisible = index === visibleIndex;

  const {width} = useWindowDimensions();
  const {top} = useSafeAreaInsets();

  useEffect(() => setCurrentVideoIndex(0), [item.id]);

  const viewabilityConfigVideo = useRef({itemVisiblePercentThreshold: 80}).current;

  const onViewableItemsChangedVideo = useRef((
    {viewableItems}: { viewableItems: ViewToken[] },
  ) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentVideoIndex(viewableItems[0].index);
    }
  }).current;

  const menuItems = useMemo(() =>
      item.items.filter(i => !!i.video)
    , [item.items]);

  return (
    <View style={styles.container}>
      <View style={[styles.topProgressWrapper, {top}]}>
        <View style={styles.topProgressContainer}>
          {menuItems.length > 1 && menuItems.map((_, i) => (
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

        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={2}
        removeClippedSubviews

        onViewableItemsChanged={onViewableItemsChangedVideo}
        viewabilityConfig={viewabilityConfigVideo}
        scrollEnabled={menuItems.length > 1}
        keyExtractor={(item, idx) => `${item.id}-video-${idx}`}
        getItemLayout={(_, index) => ({
          length: width, offset: width * index, index
        })}

        renderItem={({item: menuItem, index}) => (
          <VideoItem
            distance={+item.distance.toFixed(2)}
            rating={rating}
            restaurant={{
              name: item.name,
              city: item.city,
              restaurantId: item.id,
            }}
            menuItem={menuItem}
            onItemUpdate={onItemUpdate}
            isVisible={isVisible && index === currentVideoIndex}
            isScreenFocused={isScreenFocused}
            width={width}
            height={height}
          />
        )}
      />
    </View>
  );
};

export default VideoWrapper;

const styles = StyleSheet.create({
  container: {backgroundColor: '#000'},
  topProgressWrapper: {
    marginTop: 5,
    position: 'absolute',
    left: 30,
    right: 30,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    zIndex: 10,
  },
  topProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topProgressBar: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginHorizontal: 3,
  },
  topActiveBar: {backgroundColor: COLORS.red},
});