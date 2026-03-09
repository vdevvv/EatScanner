import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import Login from "../../components/Auth/Login/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AuthStackParamList} from "../../navigations/AuthNavigator";
import Register from "../../components/Auth/Register/Register";
import {COLORS} from "../../constants/colors";
import TaalEatLogo from "../../components/icons/TaalEatLogo";

type AuthNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Auth"
>;

const Auth = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'Auth'>>();
  const initialTab = route.params?.initialTab === "signUp" ? 'signUp' : 'signIn';
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">(initialTab);
  const navigation = useNavigation<AuthNavigationProp>();
  const {width} = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentWrapper, isTablet && styles.contentWrapperTablet]}>
        <View style={styles.logoContainer}>
          <TaalEatLogo style={styles.logo} />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "signIn" && styles.activeTab]}
            onPress={() => setActiveTab("signIn")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "signIn" && styles.activeTabText,
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "signUp" && styles.activeTab]}
            onPress={() => {
              setActiveTab("signUp");
              navigation.replace('OnBoarding1Screen')
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "signUp" && styles.activeTabText,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "signIn" ? <Login /> : <Register setAuthMode={setActiveTab} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {alignItems: "center",},
  logo: {height: 120, width: 120},
  contentWrapper: {
    width: "100%",
  },
  contentWrapperTablet: {
    alignSelf: "center",
    maxWidth: 640,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  tab: {
    paddingVertical: 6,
    width: "45%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: COLORS.black,
  },
  activeTabText: {color: COLORS.black}
})

export default Auth;
