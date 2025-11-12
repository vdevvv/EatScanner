import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/SignIn/SplashScreen";
import OnBoarding1Screen from "../screens/SignUp/OnBoarding1Screen";
import OnBoarding2Screen from "../screens/SignUp/OnBoarding2Screen";
import OnBoarding3Screen from "../screens/SignUp/OnBoarding3Screen";
import OnBoarding4Screen from "../screens/SignUp/OnBoarding4Screen";
import OnBoarding5Screen from "../screens/SignUp/OnBoarding5Screen";
import ResetPassword2 from "../screens/ResetPassword/ResetPassword2";
import ResetPassword3 from "../screens/ResetPassword/ResetPassword3";
import ResetPassword1 from "../screens/ResetPassword/ResetPassword1";
import ResetPassword4 from "../screens/ResetPassword/ResetPassword4";
import SignUp from "../screens/SignUp/SignUp";
import SignUpSetPassword1 from "../screens/SignUp/SignUpSetPassword1";
import SignUpConfirmationCode1 from "../screens/SignUp/SignUpConfirmationCode1";
import SignIn from "../screens/SignIn/SignIn";
import Auth from "../screens/Auth/Auth";

export type AuthStackParamList = {
  Auth?: { initialTab?: "signIn" | "signUp" };
  Welcome: undefined;
  OnBoarding1Screen: undefined;
  OnBoarding2Screen: undefined;
  OnBoarding3Screen: undefined;
  OnBoarding4Screen: undefined;
  OnBoarding5Screen: undefined;
  ResetPassword2: undefined;
  ResetPassword3: undefined;
  ResetPassword1: undefined;
  ResetPassword4: undefined;
  SignUp: undefined;
  SignUpSetPassword1: undefined;
  SignUpConfirmationCode1: undefined;
  SignIn: undefined;
};

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen}  />
      <AuthStack.Screen name='Auth' component={Auth} />
      <AuthStack.Screen name="SignUp" component={SignUp}/>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUpSetPassword1" component={SignUpSetPassword1}/>
      <AuthStack.Screen name="SignUpConfirmationCode1" component={SignUpConfirmationCode1}/>
      <AuthStack.Screen name="OnBoarding1Screen" component={OnBoarding1Screen}/>
      <AuthStack.Screen name="OnBoarding2Screen" component={OnBoarding2Screen}/>
      <AuthStack.Screen name="OnBoarding3Screen" component={OnBoarding3Screen}/>
      <AuthStack.Screen name="OnBoarding4Screen" component={OnBoarding4Screen}/>
      <AuthStack.Screen name="OnBoarding5Screen" component={OnBoarding5Screen}/>
      <AuthStack.Screen name="ResetPassword1" component={ResetPassword1}/>
      <AuthStack.Screen name="ResetPassword2" component={ResetPassword2}/>
      <AuthStack.Screen name="ResetPassword3" component={ResetPassword3}/>
      <AuthStack.Screen name="ResetPassword4" component={ResetPassword4}/>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
