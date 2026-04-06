import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewToken} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {DiscoveryStackParamList, HomeStackParamList} from '../../navigations/app.types';
import {COLORS} from '../../constants/colors';
import SearchBar from '../../components/Discovery/SearchBar';
import {useDebounce} from '../../hooks/use-debounce';
import {useSearchMenuItems} from '../../hooks/restaurants';
import {handleApiError} from '../../utils/handleApiError';
import {kebabToTitle} from '../../utils/helpers';
import MealCard from '../../components/Discovery/MealCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type DiscoveryRouteProp = RouteProp<DiscoveryStackParamList, 'ViewAll'>;
type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<DiscoveryStackParamList, 'Discovery'>,
  BottomTabNavigationProp<{
    Home: NavigatorScreenParams<HomeStackParamList>;
  }>
>;

const NUM_COLUMNS = 2;
const GAP = 10;
const PADDING_H = 20;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH - (PADDING_H * 2) - (GAP * (NUM_COLUMNS - 1))) / NUM_COLUMNS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4; // Aspect ratio 5/7 -> Height = Width / (5/7) -> Width * 1.4

const ViewAllScreen = () => {
  const route = useRoute<DiscoveryRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceSearchQuery, setDebounceSearchQuery] = useState('');
  const {tagSlug, searchParams} = route.params;
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const UK_CITY_NAMES = useMemo(() => new Set([
    'london',
    'manchester',
    'birmingham',
    'liverpool',
    'leeds',
    'glasgow',
    'edinburgh',
    'bristol',
    'cardiff',
    'belfast',
    'newcastle',
    'sheffield',
    'nottingham',
    'leicester',
    'coventry',
    'southampton',
    'portsmouth',
    'brighton',
    'oxford',
    'cambridge',
  ]), []);

  const isUkRestaurant = useCallback((item: any) => {
    const countryRaw = item?.category?.menu?.restaurant?.country;
    const cityRaw = item?.category?.menu?.restaurant?.city;

    const country = typeof countryRaw === 'string' ? countryRaw.trim().toLowerCase() : '';
    const city = typeof cityRaw === 'string' ? cityRaw.trim().toLowerCase() : '';

    if (country === 'uk' || country === 'united kingdom' || country === 'great britain') {
      return true;
    }

    return UK_CITY_NAMES.has(city);
  }, [UK_CITY_NAMES]);
  const tags = useMemo(() => {
    if (tagSlug === 'search-result') {
      return searchParams?.tags ?? [];
    }

    return tagSlug ? [tagSlug] : [];
  }, [tagSlug, searchParams?.tags]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error
  } = useSearchMenuItems({
    tags,
    query: debounceSearchQuery || searchParams?.query
  }, 10);

  const items = useMemo(() => {
    const allItems = data?.pages.flatMap(page => page.data) || [];
    return allItems.filter(isUkRestaurant);
  }, [data, isUkRestaurant]);

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError, error]);

  const debouncedSearch = useDebounce((value: string) => {
    setDebounceSearchQuery(value);
  }, 400);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handleCardPress = (itemId: string) => {
    navigation.navigate({
      name: 'Home', params: {
        screen: 'DishDetailScreen',
        params: {menuItemId: itemId},
      },
    });
  };

  const onViewableItemsChanged = useRef(({viewableItems}: { viewableItems: ViewToken[] }) => {
    const indices = viewableItems
      .filter(item => item.index !== null)
      .map(item => item.index as number);
    setVisibleIndices(indices);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 65,
    waitForInteraction: false,
  }).current;

  const renderItem = useCallback(({item, index}: { item: any, index: number }) => {
    const isVisible = visibleIndices.includes(index);

    return (
      <MealCard
        cardStyles={{width: ITEM_WIDTH, height: ITEM_HEIGHT,}}
        handleCardPress={() => handleCardPress(item.id)}
        shouldPlay={isVisible}
        item={{
          video: item.video,
          image: item.image,
          title: item.name,
          restaurant: item.category.menu.restaurant.name,
        }}
      />
    );
  }, [visibleIndices, handleCardPress]);

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content"/>
      <FlatList
        data={items}
        onEndReached={loadMore}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}

        contentContainerStyle={{gap: 15, paddingBottom: 50}}
        columnWrapperStyle={[styles.columnWrapper, {gap: GAP}]}

        renderItem={renderItem}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ListHeaderComponent={
          <>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={22} color="#333" style={{marginRight: 10}}/>
                <Text style={styles.screenTitle}>{kebabToTitle(tagSlug)}</Text>
              </TouchableOpacity>
            </View>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              debouncedSearch={debouncedSearch}
            />
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 500,
    color: COLORS.black,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
});

export default ViewAllScreen;
