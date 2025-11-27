import React, {useState} from "react";
import {
  StyleSheet,
  StatusBar,
  FlatList,
  ImageSourcePropType,
  Animated,
  Share, ActivityIndicator,
} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {useUser} from "../../hooks/user";
import RemoveFriendModal from "../../components/modals/RemoveFriendModal";
import BlockUserModal from "../../components/modals/BlockUserModal";
import ReportUserModal from "../../components/modals/ReportUserModal";
import FriendsProfileMenu from "../../components/modals/FriendActionsModal";
import {COLORS} from "../../constants/colors";
import PastOrderItem from "../../components/Profile/PastOrderItem";
import Header from "../../components/Profile/Header";
import {FriendsStackParamList} from "../../navigations/app.types";

const DISH_1_SOURCE =
  require("../../assets/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../../assets/potatoes-square.jpg") as ImageSourcePropType;

const PAST_ORDERS_DATA = [
  {
    id: "1",
    dishName: "Sushi Dragons",
    restaurant: "Chefs Hall",
    image: DISH_1_SOURCE,
  },
  {
    id: "2",
    dishName: "Herbed Golden Potatoes",
    restaurant: "A Mano",
    image: DISH_2_SOURCE,
  },
];

type RootStackParamList = {
  HomePageScreen: undefined;
  FriendsProfileScreen: undefined;
  FriendsProfileScreenShare: undefined;
  ChatsScreen: undefined;
  MyProfileScreen: undefined;
  BlockUserScreen: undefined;
  FriendsReportUser: undefined;
  FriendAlertBlockUser: undefined;
};

type UserProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FriendsProfileScreen"
>;

type FriendsProfileScreenRouteProp = RouteProp<FriendsStackParamList, 'FriendsProfileScreen'>;

type ModalState =
  | "none"
  | "menu"
  | "share"
  | "removeFriend"
  | "blockUser"
  | "report";

const UserProfileScreen = () => {
  const route = useRoute<FriendsProfileScreenRouteProp>();
  const {userId} = route.params;
  const {data, isLoading} = useUser(userId)
  const navigation = useNavigation<UserProfileNavigationProp>();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [modalState, setModalState] = useState<ModalState>('none');
  const closeModal = () => setModalState('none');

  if (isLoading || !data) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large"/>
      </SafeAreaView>
    );
  }

  const toggleMenu = () => {
    if (modalState === "menu") {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setModalState('none'))
    } else {
      setModalState('menu');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const onShare = () => {
    try {
      void Share.share({
        message: `${data?.fullName} @${data?.userName}`,
        url: "https://yourapp.com/user/" + userId
      });
    } catch (e) {
      console.error(e)
    }
  }

  const handleMenuOption = (option: string) => {
    toggleMenu();
    setTimeout(() => {
      switch (option) {
        case "Share Profile":
          onShare()
          break;
        case "Remove Friend":
          setModalState('removeFriend');
          break
        case "Block User":
          setModalState('blockUser');
          break;
        case "Report":
          setModalState('report')
          break;
        default:
          break;
      }
    }, 300)
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content"/>
      <FlatList
        data={PAST_ORDERS_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={{marginHorizontal: 13}}
        ListHeaderComponent={
          <Header
            handleFriendsListPress={() => {}}
            handleSavedPress={() => {}}
            handleSettingsPress={toggleMenu}
            isFriendProfilePage
          />
        }
        renderItem={({item}) => (
          <PastOrderItem
            image={item.image}
            title={item.dishName}
            restaurant={item.restaurant}
          />
        )}
      />
      <FriendsProfileMenu
        isVisible={modalState === 'menu'}
        fadeAnim={fadeAnim}
        closeModal={toggleMenu}
        onPressOption={handleMenuOption}
      />
      <RemoveFriendModal isVisible={modalState === 'removeFriend'} closeModal={closeModal}/>
      <BlockUserModal isVisible={modalState === 'blockUser'} closeModal={closeModal}/>
      <ReportUserModal isVisible={modalState === 'report'} closeModal={closeModal}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContentContainer: {
    paddingBottom: 60,
  },
})

export default UserProfileScreen;
