import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeNavigationProp } from '../../navigations/app.types';
import {
  useGetMyNotifications,
  useMarkAllNotificationsRead, useMarkNotificationRead,
} from '../../hooks/notifications';
import PageLoader from '../../components/Loader/PageLoader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from '../../utils/helpers';
import { COLORS } from '../../constants/colors';

const NotificationsScreen = () => {
  const {mutate: markAllRead} = useMarkAllNotificationsRead()
  const {mutate: markRead} = useMarkNotificationRead()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMyNotifications();
  const navigation = useNavigation<HomeNavigationProp>();
  const notifications = useMemo(() => {
    return data?.pages.flatMap(page => page.data) || [];
  }, [data]);

  if (isLoading || !data) {
    return <PageLoader />;
  }

  dayjs.extend(relativeTime);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handlePress = (menuItemId: string, notificationId: string) => {
    markRead(notificationId)
    navigation.navigate('DishDetailScreen', {
      menuItemId,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate('HomePageScreen')}>
          <Ionicons name="chevron-back" size={24} color="#222" />
          <Text style={styles.headerTitle}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => markAllRead()}>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const menuItemId = item?.data?.menuItemId;

          return (
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.8}
              onPress={menuItemId ? () => handlePress(String(menuItemId), item.id) : undefined}
            >
              <View style={styles.iconWrapper}>
                <View style={styles.iconBackground}>
                  <Ionicons name="notifications-outline" size={22} color="#fff" />
                  {!item.isRead && <View style={styles.redDot} />}
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{capitalize(dayjs(item.createdAt).fromNow())}</Text>
              </View>

              <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
    marginLeft: 8,
  },
  markReadText: {
    fontSize: 14,
    color: COLORS.grey30,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconWrapper: {
    marginRight: 14,
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9900',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
  },
  time: {
    fontSize: 13,
    color: COLORS.grey30,
    marginTop: 2,
  },
});
