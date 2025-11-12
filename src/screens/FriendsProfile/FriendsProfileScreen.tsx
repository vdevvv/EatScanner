import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  ImageSourcePropType,
  Animated,
  Share, ActivityIndicator,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {FriendsStackParamList} from "../../navigations/AppNavigator";
import {useUser} from "../../hooks/user";
import RemoveFriendModal from "../../components/modals/RemoveFriendModal";
import BlockUserModal from "../../components/modals/BlockUserModal";
import ReportUserModal from "../../components/modals/ReportUserModal";
import FriendsProfileMenu from "../../components/modals/FriendActionsModal";
import {COLORS} from "../../constants/colors";
import OrderItem from "../../components/Friends/PastOrderItem";

const DISH_1_SOURCE =
  require("../../assets/sushi-dragons.jpg") as ImageSourcePropType;
const DISH_2_SOURCE =
  require("../../assets/potatoes-square.jpg") as ImageSourcePropType;
const FRIEND_1_SOURCE =
  require("../../assets/friend1.jpg") as ImageSourcePropType;
const FRIEND_2_SOURCE =
  require("../../assets/friend2.jpg") as ImageSourcePropType;
const FRIEND_3_SOURCE =
  require("../../assets/friend3.jpg") as ImageSourcePropType;
const FRIEND_4_SOURCE =
  require("../../assets/friend4.jpg") as ImageSourcePropType;

const stats = [
  {label: "Saved", count: 46},
  {label: "Friends", count: 212},
  {label: "Shared orders", count: 212},
  {label: "Shared videos", count: 212},
]

const USER_DATA = {
  handle: "@foodie_iryna",
  name: "Talia Gomez",
  stats: [
    {label: "Saved", count: 46},
    {label: "Friends", count: 212},
    {label: "Shared orders", count: 212},
    {label: "Shared videos", count: 212},
  ],
  mutualFriendsCount: 40,
};

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

const MUTUAL_FRIENDS = [
  {
    id: "m1",
    avatar: FRIEND_1_SOURCE,
    name: "Max",
  },
  {
    id: "m2",
    avatar: FRIEND_2_SOURCE,
    name: "Anna",
  },
  {
    id: "m3",
    avatar: FRIEND_3_SOURCE,
    name: "Tom",
  },
  {
    id: "m4",
    avatar: FRIEND_4_SOURCE,
    name: "Ira",
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
        message: `Check out this profile: ${data?.fullName} (@${data?.userName})`,
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

  const StatItem = ({count, label}: { count: number; label: string }) => (
    <View style={styles.statItem}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content"/>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color={COLORS.black}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>@{data?.userName}</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileBlock}>
            <View style={styles.topRow}>
              <Image source={{uri: data?.avatar}} style={styles.avatar}/>
              <View style={styles.statsContainer}>
                {stats.map((s, i) => (
                  <StatItem key={i} count={s.count} label={s.label}/>
                ))}
              </View>
            </View>

            <Text style={styles.userName}>{data?.fullName}</Text>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Send message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mutualRow}>
            <View style={styles.mutualLeft}>
              <Text style={styles.mutualCount}>
                {USER_DATA.mutualFriendsCount}
              </Text>
              <Text style={styles.mutualLabel}>Mutual Friends</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.friendsAvatarsScroll}
            >
              {MUTUAL_FRIENDS.map((f) => (
                <View key={f.id} style={styles.friendPill}>
                  <View style={styles.avatarContainer}>
                    <Image source={f.avatar} style={styles.friendAvatar}/>
                  </View>
                  <Text style={styles.friendName}>{f.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.pastOrdersHeader}>
            <Text style={styles.pastOrdersTitle}>Past Orders</Text>
          </View>
          <FlatList
            data={PAST_ORDERS_DATA}
            renderItem={({item}) => (
              <OrderItem
                dishName={item.dishName}
                restaurant={item.restaurant}
                image={item.image}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
          />
        </ScrollView>
      </SafeAreaView>
      <FriendsProfileMenu
        isVisible={modalState === 'menu'}
        fadeAnim={fadeAnim}
        closeModal={toggleMenu}
        onPressOption={handleMenuOption}
      />
      <RemoveFriendModal isVisible={modalState === 'removeFriend'} closeModal={closeModal}/>
      <BlockUserModal isVisible={modalState === 'blockUser'} closeModal={closeModal}/>
      <ReportUserModal isVisible={modalState === 'report'} closeModal={closeModal}/>
    </>
  );
};

export default UserProfileScreen;

const PADDING_HORIZONTAL = 20;
const AVATAR_SIZE = 80;
const FRIEND_AVATAR_SIZE = 56;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  safeArea: {flex: 1, backgroundColor: COLORS.background},
  scrollContent: {paddingBottom: 20},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  headerTitle: {fontSize: 18, fontWeight: "600", color: COLORS.black},
  profileBlock: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.stroke2,
  },
  topRow: {flexDirection: "row", alignItems: "center", marginBottom: 12},
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {alignItems: "center", flex: 1},
  statCount: {fontSize: 20, fontWeight: "700", color: COLORS.black},
  statLabel: {fontSize: 12, color: COLORS.black, textAlign: "center"},
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 12,
  },
  messageButton: {
    backgroundColor: COLORS.red,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  messageButtonText: {fontSize: 16, fontWeight: "700", color: COLORS.white},

  mutualRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 14,
  },
  mutualLeft: {width: 96, alignItems: "center"},
  mutualCount: {fontSize: 20, fontWeight: "700", color: COLORS.black},
  mutualLabel: {fontSize: 12, color: COLORS.black},
  friendsAvatarsScroll: {paddingLeft: 10, paddingRight: 20},
  friendPill: {alignItems: "center", marginRight: 14},
  avatarContainer: {
    position: "relative",
  },
  friendAvatar: {
    width: FRIEND_AVATAR_SIZE,
    height: FRIEND_AVATAR_SIZE,
    borderRadius: FRIEND_AVATAR_SIZE / 2,
  },
  messengerIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  messengerIcon: {
    width: 16,
    height: 16,
  },
  friendName: {fontSize: 11, color: COLORS.black, textAlign: "center"},
  pastOrdersHeader: {paddingVertical: 12, alignItems: "center"},
  pastOrdersTitle: {fontSize: 18, fontWeight: "600", color: COLORS.black},

});
