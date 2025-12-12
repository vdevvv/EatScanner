import React, {FC, RefObject, useCallback, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Keyboard, FlatListProps} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {Feather} from '@expo/vector-icons';
import {COLORS} from '../../constants/colors';
import {useDebounce} from "../../hooks/use-debounce";
import {useAcceptFriendRequest, useSearchFriends, useSendFriendRequest} from "../../hooks/friends";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AddFriendListItem from "./AddFriendListItem";
import PageLoader from "../Loader/PageLoader";
import {useNavigation} from "@react-navigation/native";
import {MyProfileNavigationProp} from "../../navigations/app.types";

interface AddFriendSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  snapPoints: string[];
}

const AddFriendSheet: FC<AddFriendSheetProps> = ({bottomSheetRef, snapPoints}) => {
  const navigation = useNavigation<MyProfileNavigationProp>();
  const {top} = useSafeAreaInsets();
  const {mutate: sendFriendRequest} = useSendFriendRequest()
  const {mutate: acceptFriendRequest} = useAcceptFriendRequest()
  const [searchText, setSearchText] = useState('');
  const [debounceSearchText, setDebounceSearchText] = useState('');
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useSearchFriends(debounceSearchText)

  const debouncedSearch = useDebounce((value: string) => {
    setDebounceSearchText(value);
  }, 400);

  const friends = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      Keyboard.dismiss()
      setSearchText('');
      setDebounceSearchText('');
    }
  }, []);

  const renderEmptyComponent = () => {
    if (isLoading) return <PageLoader/>
    if (debounceSearchText.length > 0 && friends.length === 0 && !isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>User not found</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.indicator}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      topInset={top}
    >
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Add new friend</Text>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#999" style={styles.searchIcon}/>
          <BottomSheetTextInput
            style={styles.searchInput}
            placeholder="Search user..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleTextChange}
            returnKeyType="search"
          />
        </View>
        <View style={styles.divider}/>
      </View>
      <TypedBottomSheetFlatList
        showsVerticalScrollIndicator={false}
        data={friends}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={{marginHorizontal: 15}}
        renderItem={({item: friend}) => (
          <AddFriendListItem
            item={friend}
            sendFriendRequest={() => sendFriendRequest(friend.id)}
            onCardPress={() => navigation.navigate('FriendsProfileScreen', {
              userId: friend.id,
              friendshipStatus: friend.friendshipStatus
            })}
            acceptFriendRequest={() => acceptFriendRequest(friend.id)}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
  },
  indicator: {
    backgroundColor: '#ddd',
    width: 40,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 24,
    marginHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  shareTextContainer: {
    flex: 1,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  shareSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  }
});

export default AddFriendSheet;

const TypedBottomSheetFlatList = BottomSheetFlatList as unknown as <T = any>(props: FlatListProps<T> & {}) => React.ReactElement;