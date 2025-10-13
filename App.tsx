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
export type RootStackParamList = {
  Welcome: undefined;
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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
