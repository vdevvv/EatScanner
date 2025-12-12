import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {useUserFriends} from "../../hooks/friends";
import {FriendsNavigationProp, FriendsStackParamList} from "../../navigations/app.types";
import {useDebounce} from "../../hooks/use-debounce";
import {handleApiError} from "../../utils/handleApiError";
import UserFriendListCard from "../../components/Friends/UserFriendListCard";
import {FriendsAnotherUser} from "../../types";

type UserFriendsListRouteProp = RouteProp<FriendsStackParamList, 'UserFriendsList'>;

const UserFriendsList = () => {
  const route = useRoute<UserFriendsListRouteProp>();
  const {userId, fullName} = route.params
  const navigation = useNavigation<FriendsNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [debounceSearchText, setDebounceSearchText] = useState('');
  const {
    data,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useUserFriends(userId, debounceSearchText)

  const friends = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const debouncedSearch = useDebounce((value: string) => {
    setDebounceSearchText(value);
  }, 400);

  useEffect(() => {
    if (isError) {
      handleApiError(error)
      console.log(error)
    }
  }, [isError, error]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handlePressUser = (user: FriendsAnotherUser) => {
    if (user.friendshipStatus === 'ME') {
      navigation.navigate('MyProfile')
    } else {
      navigation.navigate('FriendsProfileScreen', {userId: user.id, friendshipStatus: user.friendshipStatus})
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'top', 'left']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#333" style={{marginRight: 10}}/>
          <Text style={styles.screenTitle}>{fullName} Friends ({data?.pages[0].meta.itemsCount})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.black} style={styles.searchIcon}/>
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
          isFetchingNextPage ? <ActivityIndicator style={{marginVertical: 20}}/> : null
        }
        renderItem={({item}) => (
          <UserFriendListCard
            friend={item}
            handlePressUser={() => handlePressUser(item)}
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
          <ActivityIndicator size="large"/>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: COLORS.white},
  headerContainer: {
    paddingHorizontal: 26,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  searchIcon: {marginRight: 8},
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    ...Platform.select({android: {paddingVertical: 0}}),
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    flexGrow: 1,
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
})

export default UserFriendsList;