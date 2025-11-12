import React from 'react';
import {FlatList, Image, ImageSourcePropType, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../../constants/colors";
import Badge from "../../components/Profile/Badge";
import PastOrderItem from "../../components/Profile/PastOrderItem";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";

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

const AVATAR_SOURCE = require("../../assets/profile-avatar.jpg") as ImageSourcePropType;

const badges = [
  {
    title: 'Sweet Tooth',
    emoji: '🍰',
    color: '#F31994',
  },
  {
    title: 'Café Connoisseur',
    emoji: '☕️',
    color: '#E17C00',
  },
  {
    title: 'Healthy Hustler',
    emoji: '🥬',
    color: '#08DE00',
  },
  {
    title: 'Spice Lord',
    emoji: '🌶️',
    color: '#CF0000',
  },
]

type MyProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyProfileScreen"
>;

const MyProfileScreen = () => {
  const navigation = useNavigation<MyProfileNavigationProp>();

  const handleSettingsPress = () => navigation.navigate("MyProfileSettings");
  const handleSavedPress = () => navigation.navigate("MyProfileSaved");
  const handleFriendsListPress = () => navigation.navigate("FriendsScreen");

  const renderHeader = () => (
    <>
      <LinearGradient
        colors={["#9F0B08", "#FF7F3F"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      >
        <View/>
        <Text style={styles.username}>@foodie_iryna</Text>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Feather name='settings' size={24} color={COLORS.white}/>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.avatarWrapper}>
        <Image source={AVATAR_SOURCE} style={styles.avatar}/>
      </View>

      <View style={styles.headerContent}>
        <Text style={styles.name}>Iryna Hvozdetska</Text>
        <Text style={styles.subtitle}>Always on the hunt for tasty food</Text>

        <View style={styles.statsWrapper}>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statTitle}>230</Text>
            <Text>Favorites</Text>
          </TouchableOpacity>
          <View style={styles.divider}/>
          <TouchableOpacity style={styles.statButton} onPress={handleSavedPress}>
            <Text style={styles.statTitle}>46</Text>
            <Text>Saved</Text>
          </TouchableOpacity>
          <View style={styles.divider}/>
          <TouchableOpacity style={styles.statButton} onPress={handleFriendsListPress}>
            <Text style={styles.statTitle}>212</Text>
            <Text>Friends</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badgesContainer}>
          {badges.map((badge, index) => (
            <Badge badge={badge} key={index}/>
          ))}
        </View>

        <Text style={styles.h2}>Past Orders</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={{marginHorizontal: 13}}
      />
    </SafeAreaView>
  );
};

const AVATAR_SIZE = 105;

const styles = StyleSheet.create({
  headerContent: {
    alignItems: 'center',
    paddingTop: 12,
  },
  listContentContainer: {
    paddingBottom: 60,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    paddingTop: 4,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 120
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: COLORS.red,
    position: 'absolute',
    top: -(AVATAR_SIZE / 2),
    marginBottom: 40
  },
  avatarWrapper: {
    marginTop: -40,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 60,
  },
  contentWrapper: {
    flex: 1,
    marginTop: AVATAR_SIZE / 2 - 40,
  },
  descriptionWrapper: {
    alignItems: 'center',
  },
  name: {
    fontWeight: '800',
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
  },
  statsWrapper: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 16,
    marginBottom: 24
  },
  statButton: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: '#B9B9B9',
    alignSelf: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  h2: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12
  },
});

export default MyProfileScreen;
