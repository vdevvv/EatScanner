import {
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
  ViewToken,
  useWindowDimensions,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import VideoWrapper, {COLORS} from "../../components/Home/VideoWrappep";
import {useRestaurants} from "../../hooks/restaurants";
import {RestaurantResponse} from "../../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {HomePageNavigationProp} from "../../components/Home/VideoItem";

const HomePageScreen = () => {
  const [page, setPage] = useState(1);
  const {data, isFetching} = useRestaurants(page)
  const hasMore = data && page < data?.meta.pageCount;
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const navigation = useNavigation<HomePageNavigationProp>();
  const isScreenFocused = useIsFocused();
  const {height} = useWindowDimensions();
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);

  useEffect(() => {
    if (!data?.data || data.data.length === 0) return;

    if (page === 1) {
      setRestaurants([...data.data]);
    } else {
      const firstIdFromNewData = data.data[0].id;
      const isAlreadyLoaded = restaurants.some(friend => friend.id === firstIdFromNewData);

      if (!isAlreadyLoaded) {
        setRestaurants(prev => [...prev, ...data.data]);
      }
    }
  }, [data]);

  const onEndReached = () => {
    if (hasMore && !isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const onViewableItemsChanged = useRef((
    {viewableItems}: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setVisibleIndex(viewableItems[0].index);
    }
  }).current;

  const getItemLayout = (_data: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.headerFixed}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <FlatList
        data={restaurants}
        pagingEnabled
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={Platform.OS === 'android'}
        getItemLayout={getItemLayout}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 80}}
        renderItem={({item, index}) => (
          <VideoWrapper
            isSaved={savedVideos.has(item.id)}
            item={item}
            index={index}
            visibleIndex={visibleIndex}
            isScreenFocused={isScreenFocused}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerFixed: {
    position: "absolute",
    top: Platform.select({ios: 45, android: StatusBar.currentHeight || 35}),
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 20,
  },
  headerIcon: {
    position: "absolute",
    right: 20,
    top: Platform.select({ios: 0, android: -5}),
  }
})

export default HomePageScreen;