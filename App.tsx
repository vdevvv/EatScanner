import React, {useEffect} from 'react';
import {useAuthStore} from './src/stores/useAuthStore';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import AppNavigator from './src/navigations/AppNavigator';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import EditProfileScreen from "./src/screens/MyProfile/MyProfileEdit";
import {setUnauthorizedHandler} from "./src/utils/api";

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
  const {loadUserOnStartup, signOut} = useAuthStore(state => state);

  useEffect(() => {
    void loadUserOnStartup();
  }, [loadUserOnStartup]);

  useEffect(() => {
    setUnauthorizedHandler(() => signOut());

    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppContent/>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

function AppContent() {
  const {user, isAuth, isGuest} = useAuthStore(state => state);
  const {top} = useSafeAreaInsets();

  const renderContent = () => {
    if (!isAuth && !isGuest) {
      return <AuthNavigator/>;
    }

    const isProfileComplete = !!(user?.userName && user?.fullName);
    if (isAuth && !isProfileComplete) {
      return <EditProfileScreen shouldShowHeader={false}/>;
    }

    return <AppNavigator/>;
  };

  return (
    <>
      <NavigationContainer>
        {renderContent()}
      </NavigationContainer>
      <Toast topOffset={top}/>
    </>
  );
}

export default App;
