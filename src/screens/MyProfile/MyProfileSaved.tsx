import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SavedCard from '../../components/Saved/SavedCard';
import { getMySaved, useToggleSave } from '../../hooks/saved';
import PageLoader from '../../components/Loader/PageLoader';
import { COLORS } from '../../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../navigations/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootTabParamList>;

const MyProfileSaved = () => {
  const navigation = useNavigation<NavigationProp>();
  const {mutate} = useToggleSave()
  const {
    data: savedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = getMySaved();

  const saved = useMemo(() => {
    return savedData?.pages.flatMap(page => page.data) || [];
  }, [savedData]);

  if (isLoading || !savedData) {
    return <PageLoader />;
  }

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handleCardPress = (itemId: string) => {
    navigation.navigate({
      name: 'Home', params: {
        screen: 'DishDetailScreen',
        params: { menuItemId: itemId },
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Saved Video</Text>
        <Text style={styles.itemsCount}>{savedData.pages[0].meta.itemsCount} videos</Text>
      </View>

      <View style={styles.wrapper}>
        <FlatList
          data={saved}
          onEndReached={loadMore}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <SavedCard
              handleBookmarkPress={() => mutate(item.id)}
              handleCardPress={() => handleCardPress(item.id)}
              dishName={item.name}
              restaurant={item.restaurant.name}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.columnWrapper}
        />

        <View style={{ height: 40 }} />
      </View>
    </SafeAreaView>
  );
};

export default MyProfileSaved;

const PADDING_HORIZONTAL = 20;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  wrapper: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  itemsCount: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10
  },
});
