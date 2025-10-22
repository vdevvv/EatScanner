// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/SignUp/SplashScreen";
import OnBoarding1Screen from "./src/screens/SignUp/OnBoarding1Screen";
import OnBoarding2Screen from "./src/screens/SignUp/OnBoarding2Screen";
import OnBoarding3Screen from "./src/screens/SignUp/OnBoarding3Screen";
import OnBoarding4Screen from "./src/screens/SignUp/OnBoarding4Screen";
import OnBoarding5Screen from "./src/screens/SignUp/OnBoarding5Screen";
import CheckEmailscreen from "./src/screens/SignUp/CheckEmailscreen";
import SignUpConfirmationCode1 from "./src/screens/SignUp/SignUpConfirmationCode1";
import SignUpSetPassword1 from "./src/screens/SignUp/SignUpSetPassword1";
import SignUp from "./src/screens/SignUp/SignUp";
import MyProfileScreen from "./src/screens/MyProfile/MyProfileScreen";
import AuthScreen from "./src/screens/SignIn/SplashScreen";
import HomePageScreen from "./src/screens/HomePage/HomePageScreen";
import FriendsProfileScreen from "./src/screens/FriendsProfile/FriendsProfileScreen";
import Discovery from "./src/screens/Discovery/DiscoveryPage";
import FriendsProfileFriends from "./src/screens/FriendsProfile/FriendsProfileFriends";
import Notifications from "./src/screens/Notifications/Notifications";
import Order from "./src/screens/Order/DiscoveryRestoranScreen";
import Splash from "./src/screens/SignIn/SplashScreen";
import SignIn from "./src/screens/SignIn/SignIn";
import FriendLockedInfo from "./src/screens/FriendsProfile/FriendLockedInfo";
import FriendsProfileScreenShare from "./src/screens/FriendsProfile/FriendsProfileScreenShare";
import RemoveFriend from "./src/screens/FriendsProfile/RemoveFriend";
import FriendAlertBlockUser from "./src/screens/FriendsProfile/FriendAlertBlockUser";
import BlockUser from "./src/screens/FriendsProfile/BlockUser";
import FriendsReportUser from "./src/screens/FriendsProfile/FriendsReportUser";
import ResetPassword1 from "./src/screens/ResetPassword/ResetPassword1";
import ResetPassword2 from "./src/screens/ResetPassword/ResetPassword2";
import ResetPassword3 from "./src/screens/ResetPassword/ResetPassword3";
import ResetPassword4 from "./src/screens/ResetPassword/ResetPassword4";
import DiscoveryFiltersPage from "./src/screens/Discovery/DiscoveryFiltersPage";
export type RootStackParamList = {
  Welcome: undefined;
  FriendLockedInfo: undefined;
  DiscoveryFiltersPage: undefined;
  FriendsReportUser: undefined;
  BlockUser: undefined;
  FriendAlertBlockUser: undefined;
  RemoveFriend: undefined;
  FriendsProfileScreenShare: undefined;
  AddFriend: undefined;
  OnBoarding1Screen: undefined;
  OnBoarding2Screen: undefined;
  OnBoarding3Screen: undefined;
  OnBoarding4Screen: undefined;
  OnBoarding5Screen: undefined;
  CheckEmailscreen: undefined;
  SignUpConfirmationCode1: undefined;
  SignUpSetPassword1: undefined;
  SignUp: undefined;
  MyProfileScreen: undefined;
  AuthScreen: undefined;
  HomePageScreen: undefined;
  FriendsProfileScreen: undefined;
  Discovery: undefined;
  FriendsProfileFriends: undefined;
  Notifications: undefined;
  Order: undefined;
  Splash: undefined;
  SignIn: undefined;
  ResetPassword1: undefined;
  ResetPassword2: undefined;
  ResetPassword3: undefined;
  ResetPassword4: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ResetPassword2" component={ResetPassword2} />
        <Stack.Screen name="ResetPassword3" component={ResetPassword3} />
        <Stack.Screen name="RemoveFriend" component={RemoveFriend} />
        <Stack.Screen
          name="DiscoveryFiltersPage"
          component={DiscoveryFiltersPage}
        />
        <Stack.Screen name="FriendsReportUser" component={FriendsReportUser} />
        <Stack.Screen name="BlockUser" component={BlockUser} />
        <Stack.Screen
          name="FriendAlertBlockUser"
          component={FriendAlertBlockUser}
        />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="FriendLockedInfo" component={FriendLockedInfo} />
        <Stack.Screen
          name="FriendsProfileScreenShare"
          component={FriendsProfileScreenShare}
        />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="FriendsProfileFriends"
          component={FriendsProfileFriends}
        />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen
          name="FriendsProfileScreen"
          component={FriendsProfileScreen}
        />
        <Stack.Screen name="HomePageScreen" component={HomePageScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Discovery" component={Discovery} />
        <Stack.Screen name="OnBoarding1Screen" component={OnBoarding1Screen} />
        <Stack.Screen name="OnBoarding2Screen" component={OnBoarding2Screen} />
        <Stack.Screen name="OnBoarding3Screen" component={OnBoarding3Screen} />
        <Stack.Screen name="OnBoarding4Screen" component={OnBoarding4Screen} />
        <Stack.Screen name="OnBoarding5Screen" component={OnBoarding5Screen} />
        <Stack.Screen name="CheckEmailscreen" component={CheckEmailscreen} />
        <Stack.Screen
          name="SignUpSetPassword1"
          component={SignUpSetPassword1}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="SignUpConfirmationCode1"
          component={SignUpConfirmationCode1}
        />
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Stack.Screen name="ResetPassword1" component={ResetPassword1} />
        <Stack.Screen name="ResetPassword4" component={ResetPassword4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
