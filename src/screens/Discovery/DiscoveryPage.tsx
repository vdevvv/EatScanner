import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator, FlatList,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationAlert } from '../../hooks/useLocationAlert';
import { useLocationStore } from '../../stores/useLocationStore';
import { COLORS } from '../../constants/colors';
import { useDiscovery, useSearchMenuItems } from '../../hooks/restaurants';
import MealSection from '../../components/Discovery/MealSection';
import { DiscoveryStackParamList } from '../../navigations/app.types';
import { handleApiError } from '../../utils/handleApiError';
import { useDebounce } from '../../hooks/use-debounce';
import DiscoveryHeader from '../../components/Discovery/DiscoveryHeader';

type DiscoveryRouteProp = RouteProp<DiscoveryStackParamList, 'Discovery'>;

const DiscoveryScreen = () => {
  useLocationAlert();
  const { data, isLoading } = useDiscovery();
  const { address, fetchLocation, permissionDenied, loading } = useLocationStore();
  const route = useRoute<DiscoveryRouteProp>();
  const tags = route.params?.selectedTags ?? [];
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceSearchQuery, setDebounceSearchQuery] = useState('');

  const { data: searchData, isError, error } = useSearchMenuItems({ tags, query: debounceSearchQuery });

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

  if (loading || permissionDenied || isLoading || !data) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  const showSearchResults = searchData && searchData.data.length > 0;
  const showNoResults =
    (searchQuery.length > 0 || tags.length > 0) && searchData && searchData.data.length === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'top']}>
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <MealSection
            title={item.groupName}
            data={item.items.map((subItem: any) => ({
              id: subItem.id,
              video: subItem.video,
              image: subItem.image,
              restaurant: subItem.category.menu.restaurant.name,
              title: subItem.name,
            }))}
          />
        )}
        keyExtractor={(item, index) => item.groupName + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews
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
                title="Search result"
                data={searchData.data.map(item => ({
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
});

export default DiscoveryScreen;
