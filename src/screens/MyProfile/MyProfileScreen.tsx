import React, { useEffect, useMemo } from 'react';
import { FlatList, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PastOrderItem from '../../components/Profile/PastOrderItem';
import { CompositeNavigationProp, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../components/Profile/Header';
import { COLORS } from '../../constants/colors';
import PageLoader from '../../components/Loader/PageLoader';
import { handleApiError } from '../../utils/handleApiError';
import {useGetMyBadges, useGetMyStats, useMe} from '../../hooks/user';
import { useGetMyOrders } from '../../hooks/orders';
import NoPastOrders from '../../components/Profile/NoPastOrders';
import { FriendsStackParamList, HomeStackParamList, MyProfileStackParamList } from '../../navigations/app.types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MyProfileStackParamList, 'Profile'>,
  BottomTabNavigationProp<{
    Friends: NavigatorScreenParams<FriendsStackParamList>;
    Home: NavigatorScreenParams<HomeStackParamList>;
  }>
>;

const MyProfileScreen = () => {
  const { data, isLoading, isError, error } = useMe();
  const navigation = useNavigation<NavigationProp>();
  const { data: statsData } = useGetMyStats();
  const {data: badgesData} = useGetMyBadges()
  const {
    data: ordersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: ordersLoading,
  } = useGetMyOrders(20);

  const orders = useMemo(() => {
    return ordersData?.pages.flatMap(page => page.data) || [];
  }, [ordersData]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, []);

  if (isLoading || ordersLoading || !data) {
    return <PageLoader />;
  }

  const handleCardPress = (itemId: string) => {
    navigation.navigate({
      name: 'Home', params: {
        screen: 'DishDetailScreen',
        params: { menuItemId: itemId },
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <NoPastOrders subtitle="You haven't ordered anything yet" />
        }
        renderItem={({ item }) => (
          <PastOrderItem
            onPress={() => handleCardPress(item.menuItemId)}
            image={item.menuItem.image}
            title={item.menuItem.name}
            restaurant={item.restaurant.name}
          />
        )}
        ListHeaderComponent={
          <Header
            badges={badgesData}
            statsData={statsData}
            userInfo={{
              avatar: data.avatar,
              userName: data.userName,
              fullName: data.fullName,
              bio: data.bio,
            }}
            handleFriendsListPress={() => navigation.navigate('FriendsScreen')}
            handleFavoritesPress={() => navigation.navigate('MyProfileFavorites')}
            handleSavedPress={() => navigation.navigate('MyProfileSaved')}
            handleSettingsPress={() => navigation.navigate('MyProfileSettings')}
          />
        }
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default MyProfileScreen;
