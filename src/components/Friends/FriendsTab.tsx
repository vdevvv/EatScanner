import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMyFriends, useRemoveFriend } from '../../hooks/friends';
import { handleApiError } from '../../utils/handleApiError';
import { useDebounce } from '../../hooks/use-debounce';
import { COLORS } from '../../constants/colors';
import NoFriends from './NoFriends';
import FriendListItem from './FriendListItem';
import { MyProfileNavigationProp } from '../../navigations/app.types';

const FriendsTab = () => {
  const navigation = useNavigation<MyProfileNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [debounceSearchText, setDebounceSearchText] = useState('');
  const {
    data,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
  } = useMyFriends(debounceSearchText);
  const { mutate } = useRemoveFriend();

  const friends = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const debouncedSearch = useDebounce((value: string) => {
    setDebounceSearchText(value);
  }, 400);

  useEffect(() => {
    if (isError) handleApiError(error);
  }, [isError, error]);

  const handlePressUser = (userId: string) => {
    navigation.navigate('FriendsProfileScreen', { userId });
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const shouldShowNoFriends = !searchText && friends.length === 0 && !isFetching && !isLoading;

  if (shouldShowNoFriends) {
    return (
      <View style={styles.centerContainer}>
        <NoFriends />
      </View>
    );
  }

  return (
    <>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.black} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          placeholderTextColor={COLORS.grey30}
          value={searchText}
          onChangeText={(value) => {
            setSearchText(value);
            debouncedSearch(value);
          }}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        data={friends}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null
        }
        renderItem={({ item }) => (
          <FriendListItem
            friend={item}
            handlePressUser={handlePressUser}
            onRemoveFriend={() => {
              mutate(item.id, { onSuccess: async () => await refetch() });
            }}
          />
        )}
        ListEmptyComponent={
          !isLoading && searchText.length > 0 ? (
            <Text style={styles.noResultsText}>No friends found matching "{searchText}"</Text>
          ) : null
        }
      />
      {isLoading && friends.length === 0 && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 44,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    ...Platform.select({ android: { paddingVertical: 0 } }),
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default FriendsTab;