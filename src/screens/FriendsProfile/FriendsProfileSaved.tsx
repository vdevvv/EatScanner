import React, {useEffect, useMemo} from 'react';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootTabParamList} from "../../navigations/AppNavigator";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {useGetUserSaved} from "../../hooks/saved";
import {FriendsStackParamList} from "../../navigations/app.types";
import PageLoader from "../../components/Loader/PageLoader";
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../../constants/colors";
import SavedCard from "../../components/Saved/SavedCard";
import {SafeAreaView} from "react-native-safe-area-context";
import {handleApiError} from "../../utils/handleApiError";

type NavigationProp = NativeStackNavigationProp<RootTabParamList>;
type FriendsProfileScreenRouteProp = RouteProp<FriendsStackParamList, 'FriendsProfileSaved'>;

const FriendsProfileSaved = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<FriendsProfileScreenRouteProp>();
  const {userId} = route.params;

  const {
    data: savedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError
  } = useGetUserSaved(userId)

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [error, isError])

  const saved = useMemo(() => {
    return savedData?.pages.flatMap(page => page.data) || [];
  }, [savedData]);

  if (isLoading || !savedData) {
    return <PageLoader/>;
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
        params: {menuItemId: itemId},
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content"/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={COLORS.black}/>
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
          renderItem={({item}) => (
            <SavedCard
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
        <View style={{height: 40}}/>
      </View>
    </SafeAreaView>
  );
};

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

export default FriendsProfileSaved;