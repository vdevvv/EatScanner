import {
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import VideoWrapper from '../../components/Home/VideoWrappep';
import { useRatings, useRestaurants } from '../../hooks/restaurants';
import { RestaurantResponse, RestaurantReviewsResponse } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { useLocationAlert } from '../../hooks/useLocationAlert';
import { useLocationStore } from '../../stores/useLocationStore';
import { HomeNavigationProp } from '../../navigations/app.types';
import PageLoader from '../../components/Loader/PageLoader';

const HomePageScreen = () => {
  useLocationAlert();
  const { coords, fetchLocation } = useLocationStore();

  const [page, setPage] = useState(1);
  const { data, isFetching } = useRestaurants(page);
  const hasMore = data && page < data?.meta.pageCount;
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const navigation = useNavigation<HomeNavigationProp>();
  const isScreenFocused = useIsFocused();
  const { height } = useWindowDimensions();
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);

  const { data: ratingsBatch } = useRatings(data?.data.map(r => r.placeId) ?? []);
  const [allRatings, setAllRatings] = useState<RestaurantReviewsResponse>({});

  useEffect(() => {
    void fetchLocation();
  }, []);

  useEffect(() => {
    if (!ratingsBatch) return;

    setAllRatings(prev => ({
      ...prev,
      ...ratingsBatch,
    }));
  }, [ratingsBatch]);

  useEffect(() => {
    if (!data?.data || data.data.length === 0) return;

    if (page === 1) {
      setRestaurants([...data.data]);
    } else {
      const firstIdFromNewData = data.data[0].id;
      const isAlreadyLoaded = restaurants.some(friend => friend.id === firstIdFromNewData);

      if (!isAlreadyLoaded) {
        setRestaurants(prev => [...prev, ...data.data]);
      }
    }
  }, [data]);

  const onEndReached = () => {
    if (hasMore && !isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const onViewableItemsChanged = useRef((
    { viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setVisibleIndex(viewableItems[0].index);
    }
  }).current;

  const getItemLayout = (_data: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });

  if (!coords) {
    return <PageLoader />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.headerFixed}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons
            name="notifications-outline"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <FlatList
        data={restaurants}
        pagingEnabled
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={Platform.OS === 'android'}
        getItemLayout={getItemLayout}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        renderItem={({ item, index }) => (
          <VideoWrapper
            coords={coords}
            isSaved={false}
            item={item}
            rating={allRatings?.[item.placeId]?.rating ?? null}
            index={index}
            visibleIndex={visibleIndex}
            isScreenFocused={isScreenFocused}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerFixed: {
    position: 'absolute',
    top: Platform.select({ ios: 45, android: StatusBar.currentHeight || 35 }),
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 20,
  },
  headerIcon: {
    position: 'absolute',
    right: 20,
    top: Platform.select({ ios: 0, android: -5 }),
  },
});

export default HomePageScreen;
