import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ExtendedFriendshipStatus} from "../types";

export type FriendsStackParamList = {
  MyProfile: undefined
  FriendsScreen: undefined;
  ContactFriends: undefined;
  FriendsProfileScreen: { userId: string, friendshipStatus: ExtendedFriendshipStatus };
  FriendsProfileSaved: { userId: string }
  UserFriendsList: { userId: string, fullName: string | null }
  FriendsProfileFavorites: { userId: string }
  FriendsProfileScreenShare: undefined;
  RemoveFriend: undefined;
  FriendAlertBlockUser: undefined;
  BlockUser: undefined;
  FriendsReportUser: undefined;
};

export type FriendsNavigationProp = NativeStackNavigationProp<FriendsStackParamList>;

export type HomeStackParamList = {
  HomePageScreen: undefined;
  Notifications: undefined;
  DishDetailScreen: { menuItemId: string };
  Order: {
    restaurant: {
      id: string,
      googleRating: number | null,
      name: string
      city: string
      distance: number | undefined
      description: string
    }
  };
  DiscoverRestoranWhere: {
    itemId: string,
    image: string
    name: string
    restaurantName: string
    rating: number
    price: string
    uberEatsUrl: string | null,
    justEatUrl: string | null,
    deliveryPrices?: Array<{
      provider: string;
      price: string;
    }>,
    talabatUrl: string | null,
    careemUrl: string | null,
    noonFoodUrl: string | null,
    deliverooUrl: string | null
  };
}

export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export type DiscoveryStackParamList = {
  Discovery: {
    selectedTags: string[];
  } | undefined;
  DiscoveryFiltersPage: undefined;
  ViewAll: {
    tagSlug: string | undefined,
    searchParams?: {
      query?: string;
      tags?: string[];
    };
  }
}

export type DiscoveryNavigationProp = NativeStackNavigationProp<DiscoveryStackParamList>;

export type MyProfileStackParamList = {
  Profile: undefined
  FriendsScreen: undefined
  ContactFriends: undefined
  FriendsProfileScreen: { userId: string, friendshipStatus: ExtendedFriendshipStatus }
  UserFriendsList: { userId: string, fullName: string | null }
  MyProfileSettings: undefined
  MyProfileSaved: undefined
  MyProfileFavorites: undefined
  MyProfileEdit: undefined
  MyProfileChangePassword: undefined
  MyProfilePolicyScreen: undefined
  MyProfileTermsConditions: undefined
  MyProfileHelpSuport: undefined
  MyProfileNotificationSettings: undefined
}

export type MyProfileNavigationProp = NativeStackNavigationProp<MyProfileStackParamList>;
