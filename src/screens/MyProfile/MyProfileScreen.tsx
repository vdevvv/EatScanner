import React from 'react';
import {FlatList, ImageSourcePropType, StatusBar, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import PastOrderItem from "../../components/Profile/PastOrderItem";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import Header from "../../components/Profile/Header";
import {COLORS} from "../../constants/colors";

const DISH_1_SOURCE =
  require("../../assets/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../../assets/potatoes-square.jpg") as ImageSourcePropType;

const PAST_ORDERS_DATA = [
  {
    id: "1",
    image: DISH_1_SOURCE,
    title: "Sushi Dragons",
    restaurant: "Yoshi House",
  },
  {
    id: "2",
    image: DISH_2_SOURCE,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
  {
    id: "3",
    image: DISH_1_SOURCE,
    title: "Sushi Dragons",
    restaurant: "Yoshi House",
  },
  {
    id: "4",
    image: DISH_2_SOURCE,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
  {
    id: "5",
    image: DISH_1_SOURCE,
    title: "Sushi Dragons",
    restaurant: "Yoshi House",
  },
  {
    id: "6",
    image: DISH_2_SOURCE,
    title: "Herbed Golden Potatoes",
    restaurant: "A Mano",
  },
];

type MyProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyProfileScreen"
>;

const MyProfileScreen = () => {
  const navigation = useNavigation<MyProfileNavigationProp>();

  const handleSettingsPress = () => navigation.navigate("MyProfileSettings");
  const handleSavedPress = () => navigation.navigate("MyProfileSaved");
  const handleFriendsListPress = () => navigation.navigate("FriendsScreen");

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content"/>
      <FlatList
        data={PAST_ORDERS_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => (
          <PastOrderItem
            image={item.image}
            title={item.title}
            restaurant={item.restaurant}
          />
        )}
        ListHeaderComponent={
          <Header
            handleFriendsListPress={handleFriendsListPress}
            handleSavedPress={handleSavedPress}
            handleSettingsPress={handleSettingsPress}
          />
        }
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={{marginHorizontal: 13}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 60,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default MyProfileScreen;
