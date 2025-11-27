import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type FriendsStackParamList = {
  FriendsScreen: undefined;
  FriendsProfileScreen: { userId: string };
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
  DishDetailScreen: {
    menuItemId: string,
    googleRating: number | null,
    restaurantName: string
  };
  Order: {
    menuId: string | null
    restaurant: {
      googleRating: number | null,
      name: string
      city: string
      distance: number | undefined
      description: string
    }
  };
  DiscoverRestoranWhere: undefined;
}

export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export type DiscoveryStackParamList = {
  Discovery: {
    selectedTags: string[];
  } | undefined;
  DiscoveryFiltersPage: undefined;
  ViewAll: {
    tagSlug: string | undefined
  }
}

export type DiscoveryNavigationProp = NativeStackNavigationProp<DiscoveryStackParamList>;