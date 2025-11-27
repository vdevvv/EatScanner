import React, { FC, useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import MealCard from './MealCard';
import { camelToTitle } from '../../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { DiscoveryNavigationProp } from '../../navigations/app.types';

interface MealSectionProps {
  title: string;
  data: Array<{
    id: string;
    video: string | null
    image: string
    title: string
    restaurant: string
  }>;
}

const MealSection: FC<MealSectionProps> = ({ title, data }) => {
  const navigation = useNavigation<DiscoveryNavigationProp>();
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: false,
  }).current;

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const visibleIds = viewableItems.map((item) => item.item.id);
    setVisibleItems(visibleIds);
  }, []);

  if (data.length === 0) return null;

  const getSlug = (title: string) => {
    switch (title) {
      case 'Search result':
        return 'search-result'
      case 'recommendedForYou':
        return 'recommended-for-you';
      case 'glutenFree':
        return 'gluten-free';
      case 'vegetarian':
        return 'vegetarian';
      case 'vegan':
        return 'vegan';
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{camelToTitle(title)}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { tagSlug: getSlug(title) })}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard item={item} shouldPlay={visibleItems.includes(item.id)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 10 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E57373',
  },
});

export default MealSection;
