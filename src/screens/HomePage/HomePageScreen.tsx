import {
  Alert,
  Button,
  FlatList,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import VideoWrapper from '../../components/Home/VideoWrappep';
import { useRatings, useRestaurants } from '../../hooks/restaurants';
import { RestaurantResponse2, RestaurantReviewsResponse } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { useLocationAlert } from '../../hooks/useLocationAlert';
import { useLocationStore } from '../../stores/useLocationStore';
import {useAuthStore} from '../../stores/useAuthStore';
import { HomeNavigationProp } from '../../navigations/app.types';
import PageLoader from '../../components/Loader/PageLoader';
import { handleApiError } from '../../utils/handleApiError';

const HomePageScreen = () => {
  useLocationAlert();
  const { coords, fetchLocation, loading: isLocationLoading, permissionDenied, error: locationError } = useLocationStore();
  const [page, setPage] = useState(1);
  const { data, isFetching, isError, error } = useRestaurants(page, coords?.latitude, coords?.longitude);
  const hasMore = data && page < data?.meta.pageCount;
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const navigation = useNavigation<HomeNavigationProp>();
  const isScreenFocused = useIsFocused();
  const isGuest = useAuthStore(state => state.isGuest);
  const exitGuestMode = useAuthStore(state => state.exitGuestMode);
  const [restaurants, setRestaurants] = useState<RestaurantResponse2[]>([]);
  const { data: ratingsBatch } = useRatings(data?.data.map(r => r.placeId) ?? []);
  const [allRatings, setAllRatings] = useState<RestaurantReviewsResponse>({});
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError, error]);

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
    length: containerHeight,
    offset: containerHeight * index,
    index,
  });

  const handleItemUpdate = (itemId: string, type: 'like' | 'save') => {
    setRestaurants(prevRestaurants => {
      return prevRestaurants.map(restaurant => ({
        ...restaurant,
        items: restaurant.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              isLiked: type === 'like' ? !item.isLiked : item.isLiked,
              isSaved: type === 'save' ? !item.isSaved : item.isSaved,
            };
          }
          return item;
        }),
      }));
    });
  };

  if (!coords && isLocationLoading) {
    return <PageLoader />;
  }

  if (!coords) {
    return (
      <SafeAreaView style={styles.emptyState}>
        <Text style={styles.emptyTitle}>
          {permissionDenied ? 'Location Access Required' : 'Unable to get location'}
        </Text>
        <Text style={styles.emptySubtitle}>
          {permissionDenied
            ? 'Allow location to view nearby restaurants.'
            : (locationError || 'Please try again.')}
        </Text>
        <Button title="Try Again" onPress={() => void fetchLocation()} />
      </SafeAreaView>
    );
  }

  if (isError || (!isFetching && restaurants.length === 0)) {
    return (
      <SafeAreaView style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Unable to load content</Text>
        <Text style={styles.emptySubtitle}>Please try again.</Text>
        <Button title="Retry" onPress={() => {
          setPage(1);
          void fetchLocation();
        }} />
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: '#000' }}
      onLayout={(e) => {
        const {height} = e.nativeEvent.layout;
        if (height !== containerHeight) {
          setContainerHeight(height);
        }
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.headerFixed}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => {
            if (isGuest) {
              Alert.alert('Sign In Required', 'Please sign in to view notifications.', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Sign In', onPress: exitGuestMode},
              ]);
              return;
            }
            navigation.navigate('Notifications');
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {containerHeight > 0 && <FlatList
          data={restaurants}
          pagingEnabled
          onEndReached={onEndReached}
          onEndReachedThreshold={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={3}
          removeClippedSubviews={Platform.OS === 'android'}
          getItemLayout={getItemLayout}
          snapToInterval={containerHeight}
          snapToAlignment="start"
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{itemVisiblePercentThreshold: 80}}
          renderItem={({item, index}) => (
            <VideoWrapper
              item={item}
              index={index}
              rating={allRatings?.[item.placeId]?.rating ?? null}
              visibleIndex={visibleIndex}
              isScreenFocused={isScreenFocused}
              onItemUpdate={handleItemUpdate}
              height={containerHeight}
            />
          )}
      />}
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
  emptyState: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.grey30,
    textAlign: 'center',
    marginBottom: 6,
  },
});

export default HomePageScreen;
