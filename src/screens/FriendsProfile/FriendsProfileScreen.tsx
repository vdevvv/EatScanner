import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  FlatList,
  Animated,
  Share,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetUserStats, useUser } from '../../hooks/user';
import RemoveFriendModal from '../../components/modals/RemoveFriendModal';
import BlockUserModal from '../../components/modals/BlockUserModal';
import ReportUserModal from '../../components/modals/ReportUserModal';
import FriendsProfileMenu from '../../components/modals/FriendActionsModal';
import { COLORS } from '../../constants/colors';
import PastOrderItem from '../../components/Profile/PastOrderItem';
import Header from '../../components/Profile/Header';
import { FriendsNavigationProp, FriendsStackParamList } from '../../navigations/app.types';
import { useGetUserOrders } from '../../hooks/orders';
import PageLoader from '../../components/Loader/PageLoader';
import { handleApiError } from '../../utils/handleApiError';
import NoPastOrders from '../../components/Profile/NoPastOrders';
import { useGetMutationFriends } from '../../hooks/friends';

type FriendsProfileScreenRouteProp = RouteProp<FriendsStackParamList, 'FriendsProfileScreen'>;

type ModalState =
  | 'none'
  | 'menu'
  | 'share'
  | 'removeFriend'
  | 'blockUser'
  | 'report';

const UserProfileScreen = () => {
  const route = useRoute<FriendsProfileScreenRouteProp>();
  const navigation = useNavigation<FriendsNavigationProp>();
  const { userId } = route.params;
  const { data: user, isLoading, isError, error } = useUser(userId);
  const { data: mutationFriendsData } = useGetMutationFriends(userId);
  const { data: statsData } = useGetUserStats(userId);
  const {
    data: ordersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: ordersLoading,
  } = useGetUserOrders(userId);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [modalState, setModalState] = useState<ModalState>('none');
  const closeModal = () => setModalState('none');

  const orders = useMemo(() => {
    return ordersData?.pages.flatMap(page => page.data) || [];
  }, [ordersData]);

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, []);

  if (isLoading || ordersLoading || !user) {
    return <PageLoader />;
  }

  const toggleMenu = () => {
    if (modalState === 'menu') {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setModalState('none'));
    } else {
      setModalState('menu');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const onShare = () => {
    try {
      void Share.share({
        message: `${user.fullName} @${user.userName}`,
        url: 'https://yourapp.com/user/' + userId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleMenuOption = (option: string) => {
    toggleMenu();
    setTimeout(() => {
      switch (option) {
        case 'Share Profile':
          onShare();
          break;
        case 'Remove Friend':
          setModalState('removeFriend');
          break;
        case 'Block User':
          setModalState('blockUser');
          break;
        case 'Report':
          setModalState('report');
          break;
        default:
          break;
      }
    }, 300);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handleMutualFriendPress = (userId: string) => {
    navigation.navigate('FriendsProfileScreen', { userId });
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
          <NoPastOrders subtitle="User haven't ordered anything yet" />
        }
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <Header
            handleMutualFriendPress={handleMutualFriendPress}
            mutualFriends={mutationFriendsData}
            statsData={statsData}
            userInfo={{
              avatar: user.avatar,
              fullName: user.fullName,
              userName: user.userName,
              bio: user.bio,
            }}
            handleFriendsListPress={() => {
            }}
            handleSavedPress={() => {
            }}
            handleFavoritesPress={() => {
            }}
            handleSettingsPress={toggleMenu}
            isFriendProfilePage
          />
        }
        renderItem={({ item }) => (
          <PastOrderItem
            onPress={() => {
            }}
            image={item.menuItem.image}
            title={item.menuItem.name}
            restaurant={item.restaurant.name}
          />
        )}
      />
      <FriendsProfileMenu
        isVisible={modalState === 'menu'}
        fadeAnim={fadeAnim}
        closeModal={toggleMenu}
        onPressOption={handleMenuOption}
      />
      <RemoveFriendModal isVisible={modalState === 'removeFriend'} closeModal={closeModal} />
      <BlockUserModal isVisible={modalState === 'blockUser'} closeModal={closeModal} />
      <ReportUserModal isVisible={modalState === 'report'} closeModal={closeModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  columnWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
});

export default UserProfileScreen;
