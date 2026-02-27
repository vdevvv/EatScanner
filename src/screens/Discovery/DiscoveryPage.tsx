import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import {
  Button,
  View,
  StyleSheet,
  ActivityIndicator, FlatList, Text, ViewToken,
} from 'react-native';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp, useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationAlert } from '../../hooks/useLocationAlert';
import { useLocationStore } from '../../stores/useLocationStore';
import { COLORS } from '../../constants/colors';
import { useDiscovery, useSearchMenuItems } from '../../hooks/restaurants';
import MealSection from '../../components/Discovery/MealSection';
import {
  DiscoveryStackParamList,
  HomeStackParamList,
} from '../../navigations/app.types';
import { handleApiError } from '../../utils/handleApiError';
import { useDebounce } from '../../hooks/use-debounce';
import DiscoveryHeader from '../../components/Discovery/DiscoveryHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type DiscoveryRouteProp = RouteProp<DiscoveryStackParamList, 'Discovery'>;
type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<DiscoveryStackParamList, 'Discovery'>,
  BottomTabNavigationProp<{
    Home: NavigatorScreenParams<HomeStackParamList>;
  }>
>;

const DiscoveryScreen = () => {
  useLocationAlert();
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading, isError: isDiscoveryError, refetch } = useDiscovery();
  const { address, fetchLocation, permissionDenied } = useLocationStore();
  const route = useRoute<DiscoveryRouteProp>();
  const tags = route.params?.selectedTags ?? [];
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceSearchQuery, setDebounceSearchQuery] = useState('');
  const { data: searchData, isError, error } = useSearchMenuItems({ tags, query: debounceSearchQuery }, 5);
  const [visibleSectionIndices, setVisibleSectionIndices] = useState<number[]>([]);

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (!address && !permissionDenied) {
      void fetchLocation();
    }
  }, []);

  const searchResult = useMemo(() => {
    return searchData?.pages.flatMap(page => page.data) || [];
  }, [searchData]);

  const debouncedSearch = useDebounce((value: string) => {
    setDebounceSearchQuery(value);
  }, 400);

  const listData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data).map(([groupName, items]) => ({
      groupName,
      items,
    }));
  }, [data]);

  const handleCardPress = (itemId: string) => {
    navigation.navigate({
      name: 'Home', params: {
        screen: 'DishDetailScreen',
        params: { menuItemId: itemId },
      },
    });
  }

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const indices = viewableItems
      .filter(item => item.index !== null)
      .map(item => item.index as number);
    setVisibleSectionIndices(indices);
  }).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
    waitForInteraction: false,
  }).current;

  const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
    const isVisible = visibleSectionIndices.includes(index) && isFocused;

    return (
      <MealSection
        handleCardPress={handleCardPress}
        title={item.groupName}
        isSectionVisible={isVisible}
        data={item.items.map((subItem: any) => ({
          id: subItem.id,
          video: subItem.video,
          image: subItem.image,
          restaurant: subItem.category.menu.restaurant.name,
          title: subItem.name,
        }))}
      />
    );
  }, [visibleSectionIndices, handleCardPress, isFocused]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (isDiscoveryError || !data) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorTitle}>Unable to load content</Text>
        <Text style={styles.errorSubtitle}>Please try again.</Text>
        <Button title="Retry" onPress={() => void refetch()} />
      </SafeAreaView>
    );
  }
  const showSearchResults = searchData && searchResult.length > 0;
  const showNoResults =
    (searchQuery.length > 0 || tags.length > 0) && searchData && searchResult.length === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'top']}>
      <FlatList
        data={listData.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.groupName + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}

        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}

        ListFooterComponent={<View style={{ height: 100 }} />}
        ListHeaderComponent={
          <>
            <DiscoveryHeader
              address={address}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              debouncedSearch={debouncedSearch}
              showNoResults={showNoResults}
            />
            {showSearchResults && (
              <MealSection
                handleCardPress={handleCardPress}
                title="Search result"
                isSectionVisible
                searchParams={{
                  query: searchQuery,
                  tags: tags
                }}
                data={searchResult.slice(0,5).map(item => ({
                  id: item.id,
                  video: item.video,
                  image: item.image,
                  restaurant: item.category.menu.restaurant.name,
                  title: item.name,
                }))}
              />
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: COLORS.grey30,
    marginBottom: 12,
  },
});

export default DiscoveryScreen;
