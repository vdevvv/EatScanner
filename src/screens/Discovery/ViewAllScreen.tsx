import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DiscoveryNavigationProp, DiscoveryStackParamList } from '../../navigations/app.types';
import { COLORS } from '../../constants/colors';
import SearchBar from '../../components/Discovery/SearchBar';
import { useDebounce } from '../../hooks/use-debounce';
import { useSearchMenuItems } from '../../hooks/restaurants';
import { handleApiError } from '../../utils/handleApiError';
import { kebabToTitle } from '../../utils/helpers';
import MealCard from '../../components/Discovery/MealCard';

type DiscoveryRouteProp = RouteProp<DiscoveryStackParamList, 'ViewAll'>;

const ViewAllScreen = () => {
  const route = useRoute<DiscoveryRouteProp>();
  const navigation = useNavigation<DiscoveryNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceSearchQuery, setDebounceSearchQuery] = useState('');
  const { tagSlug } = route.params;
  const { data, isError, error } = useSearchMenuItems({ tags: [tagSlug ?? ''], query: debounceSearchQuery });

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError, error]);

  const debouncedSearch = useDebounce((value: string) => {
    setDebounceSearchQuery(value);
  }, 400);

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#333" style={{ marginRight: 10 }} />
          <Text style={styles.screenTitle}>{kebabToTitle(tagSlug)}</Text>
        </TouchableOpacity>
      </View>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        debouncedSearch={debouncedSearch}
      />
      <FlatList
        data={data?.data}
        numColumns={2}
        columnWrapperStyle={{ marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MealCard
            shouldPlay
            item={{
              video: item.video,
              image: item.image,
              title: item.name,
              restaurant: item.category.menu.restaurant.name,
            }}
          />
        )}
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
});

export default ViewAllScreen;