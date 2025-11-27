import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import HomePageScreen from "../screens/HomePage/HomePageScreen";
import MyProfileScreen from "../screens/MyProfile/MyProfileScreen";
import Discovery from "../screens/Discovery/DiscoveryPage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DishDetailScreen from "../screens/Order/DiscoveryRestoranOrderScreen";
import Notifications from "../screens/Notifications/Notifications";
import Order from "../screens/Order/DishDetailScreen";
import DiscoveryFiltersPage from "../screens/Discovery/DiscoveryFiltersPage";
import DiscoverRestoranWhere from "../screens/Order/DiscoverRestoranWhere";

// import FriendsProfileFriends from "../screens/FriendsProfile/FriendsProfileFriends";
import FriendsProfileScreen from "../screens/FriendsProfile/FriendsProfileScreen";
import FriendsProfileScreenShare from "../screens/FriendsProfile/FriendsProfileScreenShare";
import BlockUser from "../screens/FriendsProfile/BlockUser";

import MyProfileSettings from "../screens/MyProfile/MyProfileSettings";
import MyProfileSaved from "../screens/MyProfile/MyProfileSaved";
import FriendsScreen from "../screens/MyProfile/MyProfileFriends";
import MyProfileEdit from "../screens/MyProfile/MyProfileEdit";
import MyProfileChangePassword from "../screens/MyProfile/MyProfileChangePassword";
import MyProfilePolicyScreen from "../screens/MyProfile/MyProfilePolicyScreen";
import MyProfileTermsConditions from "../screens/MyProfile/MyProfileTermsConditions";
import MyProfileHelpSuport from "../screens/MyProfile/MyProfileHelpSuport";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { DiscoveryStackParamList, FriendsStackParamList, HomeStackParamList } from './app.types';
import ViewAllScreen from '../screens/Discovery/ViewAllScreen';

export type RootTabParamList = {
  Home: undefined;
  Discovery: undefined;
  Friends: undefined;
  Profile: undefined;
};

const AppNavigator = () => {
  const insets = useSafeAreaInsets()
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const HomeStack = createNativeStackNavigator<HomeStackParamList>();
  const HomeStackNavigator = () => (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomePageScreen" component={HomePageScreen}/>
      <HomeStack.Screen name="Notifications" component={Notifications}/>
      <HomeStack.Screen name="Order" component={Order}/>
      <HomeStack.Screen name="DishDetailScreen" component={DishDetailScreen}/>
      <HomeStack.Screen name='DiscoverRestoranWhere' component={DiscoverRestoranWhere} />
    </HomeStack.Navigator>
  );

  const DiscoveryStack = createNativeStackNavigator<DiscoveryStackParamList>();
  const DiscoverStackNavigator = () => (
    <DiscoveryStack.Navigator screenOptions={{headerShown: false}}>
      <DiscoveryStack.Screen name="Discovery" component={Discovery}/>
      <DiscoveryStack.Screen name="DiscoveryFiltersPage" component={DiscoveryFiltersPage}/>
      <DiscoveryStack.Screen name='ViewAll' component={ViewAllScreen} />
    </DiscoveryStack.Navigator>
  )

  const FriendsStack = createNativeStackNavigator<FriendsStackParamList>();
  const FriendsStackNavigator = () => (
    <FriendsStack.Navigator screenOptions={{headerShown: false}}>
      <FriendsStack.Screen name="FriendsScreen" component={FriendsScreen}/>
      {/*<FriendsStack.Screen name="FriendsProfileFriends" component={FriendsProfileFriends}/>*/}
      <FriendsStack.Screen name="FriendsProfileScreen" component={FriendsProfileScreen}/>
      <FriendsStack.Screen name="FriendsProfileScreenShare" component={FriendsProfileScreenShare}/>
      <FriendsStack.Screen name="BlockUser" component={BlockUser}/>
    </FriendsStack.Navigator>
  )

  const MyProfileStack = createNativeStackNavigator();
  const MyProfileStackNavigator = () => (
    <MyProfileStack.Navigator screenOptions={{headerShown: false}}>
      <MyProfileStack.Screen name="Profile" component={MyProfileScreen}/>
      <MyProfileStack.Screen name="FriendsScreen" component={FriendsScreen}/>
      <FriendsStack.Screen name="FriendsProfileScreen" component={FriendsProfileScreen}/>
      <MyProfileStack.Screen name="MyProfileSettings" component={MyProfileSettings}/>
      <MyProfileStack.Screen name="MyProfileSaved" component={MyProfileSaved}/>
      <MyProfileStack.Screen name="MyProfileEdit" component={MyProfileEdit}/>
      <MyProfileStack.Screen name="MyProfileChangePassword" component={MyProfileChangePassword}/>
      <MyProfileStack.Screen name="MyProfilePolicyScreen" component={MyProfilePolicyScreen}/>
      <MyProfileStack.Screen name="MyProfileTermsConditions" component={MyProfileTermsConditions}/>
      <MyProfileStack.Screen name="MyProfileHelpSuport" component={MyProfileHelpSuport}/>
    </MyProfileStack.Navigator>
  )

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#E9725C",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {paddingBottom: insets.bottom},
        tabBarIcon: ({color}) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Discovery":
              iconName = "search-outline";
              break;
            case "Friends":
              iconName = "people-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={24} color={color}/>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator}/>
      <Tab.Screen name="Discovery" component={DiscoverStackNavigator}/>
      <Tab.Screen name="Friends" component={FriendsStackNavigator}/>
      <Tab.Screen name="Profile" component={MyProfileStackNavigator}/>
    </Tab.Navigator>
  );
};

export default AppNavigator;
