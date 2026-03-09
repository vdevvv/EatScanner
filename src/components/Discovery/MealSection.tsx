import React, {FC, useCallback, useRef, useState, memo} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, ViewToken} from 'react-native';
import MealCard from './MealCard';
import {camelToTitle} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {DiscoveryNavigationProp} from '../../navigations/app.types';

interface MealSectionProps {
  title: string;
  handleCardPress: (itemId: string) => void;
  isSectionVisible: boolean;
  data: Array<{
    id: string;
    video: string | null
    image: string
    title: string
    restaurant: string
  }>;
  searchParams?: {
    query?: string;
    tags?: string[];
  };
}

const GAP = 15;

const MealSection: FC<MealSectionProps> = ({title, data, handleCardPress, searchParams, isSectionVisible}) => {
  const {width} = useWindowDimensions();
  const isTablet = width >= 768;
  const cardWidth = isTablet ? 190 : 150;
  const cardHeight = isTablet ? 270 : 220;
  const navigation = useNavigation<DiscoveryNavigationProp>();
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
    waitForInteraction: false,
  }).current;

  const onViewableItemsChanged = useCallback(({viewableItems}: { viewableItems: ViewToken[] }) => {
    const indices = viewableItems
      .filter(item => item.index !== null)
      .map((item) => item.index as number);
    setVisibleIndices(indices);
  }, []);

  const getSlug = (title: string) => {
    switch (title) {
      case 'Search result':
        return 'search-result';
      case 'recommendedForYou':
        return 'recommended-for-you';
      case 'glutenFree':
        return 'gluten-free';
      case 'vegetarian':
        return 'vegetarian';
      case 'vegan':
        return 'vegan';
      default:
        return '';
    }
  };

  const handleViewAllPress = () => {
    navigation.navigate('ViewAll', {
      tagSlug: getSlug(title),
      ...(searchParams && {searchParams}),
    });
  }

  const renderItem = useCallback(({item, index}: { item: any, index: number }) => {
    const shouldPlay = isSectionVisible && visibleIndices.includes(index);

    return (
      <MealCard
        handleCardPress={() => handleCardPress(item.id)}
        item={item}
        shouldPlay={shouldPlay}
        cardStyles={{width: cardWidth, height: cardHeight}}
      />
    );
  }, [cardHeight, cardWidth, isSectionVisible, visibleIndices, handleCardPress]);

  if (data.length === 0) return null;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{camelToTitle(title)}</Text>
        <TouchableOpacity onPress={handleViewAllPress}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: GAP}}

        windowSize={3}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        removeClippedSubviews={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: cardWidth,
          offset: (cardWidth + GAP) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {marginBottom: 30},
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

export default memo(MealSection);
