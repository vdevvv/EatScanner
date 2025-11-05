import React, {useEffect} from 'react';
import {useAuthStore} from "./src/stores/useAuthStore";
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigator from "./src/navigations/AuthNavigator";
import AppNavigator from "./src/navigations/AppNavigator";
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

export type RootStackParamList = {
  Auth: undefined
  Welcome: undefined;
  DiscoverRestoranWhere: undefined;
  FriendsScreen: undefined;
  DiscoveryRestoranOrderScreen: undefined;
  DishDetailScreen: undefined;
  MyProfileChangePassword: undefined;
  MyProfileSaved: undefined;
  FriendLockedInfo: undefined;
  MyProfileEdit: undefined;
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
  MyProfileSettings: undefined;
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
  MyProfilePolicyScreen: undefined;
  MyProfileTermsConditions: undefined;
  MyProfileHelpSuport: undefined;
  ProfileScreen: undefined;
  OrderScreen: undefined;
  SavedScreen: undefined;
};

const App = () => {
  const queryClient = new QueryClient();
  const {loadUserOnStartup, isAuth} = useAuthStore(state => state);

  useEffect(() => {
    void loadUserOnStartup();
  }, [loadUserOnStartup]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppContent isAuth={isAuth}/>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

function AppContent({isAuth}: { isAuth: boolean }) {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <NavigationContainer>
        {isAuth ? <AppNavigator/> : <AuthNavigator/>}
      </NavigationContainer>
      <Toast topOffset={top}/>
    </>
  )
}

export default App;
