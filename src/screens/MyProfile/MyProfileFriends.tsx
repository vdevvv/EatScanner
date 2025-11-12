import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform, FlatList, ActivityIndicator,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useMyFriends, useRemoveFriend} from "../../hooks/friends";
import {handleApiError} from "../../utils/handleApiError";
import FriendListItem from "../../components/Friends/FriendListItem";
import {useDebounce} from "../../hooks/use-debounce";
import {Friend} from "../../types";
import {FriendsNavigationProp} from "../../navigations/AppNavigator";
import {COLORS} from "../../constants/colors";

const {width} = Dimensions.get("window");

const FriendsScreenFinal = () => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debounceSearchText, setDebounceSearchText] = useState("");

  const {data, isError, error, isFetching} = useMyFriends(debounceSearchText, page);
  const {mutate} = useRemoveFriend();

  const hasMore = data && page < data?.meta.pageCount;
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    if (!data?.data || data.data.length === 0) return;

    if (page === 1) {
      setFriends([...data.data]);
    } else {
      const firstIdFromNewData = data.data[0].id;
      const isAlreadyLoaded = friends.some(friend => friend.id === firstIdFromNewData);

      if (!isAlreadyLoaded) {
        setFriends(prev => [...prev, ...data.data]);
      }
    }
  }, [data]);

  const debouncedSearch = useDebounce((value: string) => {
    setDebounceSearchText(value);
    setPage(1);
    setFriends([]);
  }, 400);

  if (isError) handleApiError(error);

  const handlePressUser = (userId: string) => {
    navigation.navigate('FriendsProfileScreen', {userId})
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#333" style={{marginRight: 10}}/>
          <Text style={styles.screenTitle}>Friends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={COLORS.black}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search anyone..."
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
        onEndReached={() => {
          if (hasMore && !isFetching) {
            setPage(prev => prev + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching && page > 1 ? <ActivityIndicator style={{marginVertical: 20}}/> : null
        }
        renderItem={({item}) => (
          <FriendListItem
            friend={item}
            handlePressUser={handlePressUser}
            onRemoveFriend={() => {
              mutate(item.id, {
                onSuccess: () => {
                  setPage(1);
                  setFriends([]);
                }
              });
            }}
          />
        )}
      />
      {searchText.length > 0 && !isFetching && friends.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            No users found matching "{searchText}"
          </Text>
        </View>
      )}

      {isFetching && page === 1 && friends.length === 0 && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large"/>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: "relative",
    width,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    ...Platform.select({
      android: {paddingVertical: 0},
    }),
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    flexGrow: 1,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  noResultsText: {
    color: "#999",
    fontSize: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  }
});

export default FriendsScreenFinal;