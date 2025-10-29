import {
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
  ViewToken,
  useWindowDimensions,
} from "react-native";
import {DishData} from "../../components/restaurantItem";
import React, {useRef, useState} from "react";
import TabBars from "./TabBars";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import VideoWrapper, {COLORS, HomePageNavigationProp} from "../../components/Home/VideoWrappep";

const videos = [
  require('../../assets/videos/golden-flacky.mp4'),
  require('../../assets/videos/pizza.mp4'),
  require('../../assets/videos/icecream.mp4'),
  require('../../assets/videos/kebab.mp4'),
]

const images = [
  require("../../assets/potato-green.jpg"),
  require("../../assets/food1.jpg"),
  require("../../assets/food2.jpg"),
  require("../../assets/food3.jpg"),
  require("../../assets/food4.jpg"),
  require("../../assets/food5.jpg"),
  require("../../assets/food6.jpg"),
  require("../../assets/food7.jpg"),
  require("../../assets/food8.jpg"),
  require("../../assets/food9.jpg"),
  require("../../assets/dumplings-top.jpg"),
  require("../../assets/pasta.jpg"),
  require("../../assets/pasta copy.jpg"),
  require("../../assets/potatoes-square.jpg"),
  require("../../assets/sushi-dragons.jpg"),
];

const DISH_DATA: DishData[] = [
  {
    id: '1',
    title: "Golden, flaky layers",
    restaurant: "fixdessertchocolatier",
    location: "Dubai",
    distance: "3 miles away",
    rating: 5.0,
    userRating: 4.8,
    price: 45,
    imageSource: images[0],
    videoSource: videos[0],
  },
  {
    id: '2',
    title: "Marinara",
    restaurant: "zazaslice",
    location: "Marina Walk",
    distance: "3.5 miles away",
    rating: 4.8,
    userRating: 4.6,
    price: 65,
    imageSource: images[6],
    videoSource: videos[1],
  },
  {
    id: '3',
    title: "Ice Cream",
    restaurant: "findsalt",
    location: "Beach Road",
    distance: "6 miles away",
    rating: 4.4,
    userRating: 4.2,
    price: 38,
    imageSource: images[7],
    videoSource: videos[2],
  },
  {
    id: '4',
    title: "Kebab",
    restaurant: "Hashmibarbeque",
    location: "Business Bay",
    distance: "2 miles away",
    rating: 4.6,
    userRating: 4.4,
    price: 32,
    imageSource: images[8],
    videoSource: videos[3],
  },
];

const HomePageScreen = () => {
  const [allVideos] = useState<DishData[]>(DISH_DATA);
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const numOfRefreshes = useRef(0);
  const navigation = useNavigation<HomePageNavigationProp>();
  const isScreenFocused = useIsFocused();
  const {width, height} = useWindowDimensions();
  const fetchMoreData = () => {
    // setAllVideos(prev => [...prev, ...DISH_DATA]);
    numOfRefreshes.current += 1;
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const onViewableItemsChanged = useRef((
    {viewableItems}: {
      viewableItems: ViewToken[]
    }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setVisibleIndex(viewableItems[0].index);
    }
  }).current;

  const getItemLayout = (_data: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });

  const toggleSaveDish = (item: DishData) => {
    setSavedVideos((prev) => {
      const updated = new Set(prev);
      if (updated.has(item.id)) {
        updated.delete(item.id);
      } else {
        updated.add(item.id);
      }
      return updated;
    });
  };


  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.headerFixed}>
        <View style={styles.topProgressWrapper}>
          <View style={[styles.topProgressContainer, {width: width - 100}]}>
            {allVideos.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.topProgressBar,
                  visibleIndex === i && styles.topActiveBar,
                ]}
              />
            ))}
          </View>
        </View>
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
        pagingEnabled
        onEndReached={fetchMoreData}
        data={allVideos}
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
        viewabilityConfig={viewabilityConfig}
        renderItem={({item, index}) => (
          <VideoWrapper
            toggleSaveDish={toggleSaveDish}
            isSaved={savedVideos.has(item.id)}
            item={item}
            index={index}
            visibleIndex={visibleIndex}
            isScreenFocused={isScreenFocused}
          />
        )}
      />
      <TabBars/>
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
  topProgressWrapper: {
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 12,
  },
  topProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topProgressBar: {
    flex: 1,
    height: 5,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 3,
  },
  topActiveBar: {backgroundColor: COLORS.primary},
  headerIcon: {
    position: "absolute",
    right: 20,
    top: Platform.select({ios: 0, android: -5}),
  }
})

export default HomePageScreen;