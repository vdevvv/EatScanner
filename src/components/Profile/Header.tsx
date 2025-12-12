import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import Badge from './Badge';
import React, { FC } from 'react';
import ProfileStats from './ProfileStats';
import Actions from './Actions';
import {MutualFriend, UserStatsResponse, Badge as IBadge, ExtendedFriendshipStatus} from '../../types';
import MutualFriendsSection from '../Friends/MutualFriendsSection';

interface HeaderProps {
  handleSettingsPress: () => void;
  handleSavedPress: () => void;
  handleFavoritesPress: () => void;
  handleFriendsListPress: () => void;
  isFriendProfilePage?: boolean;
  statsData: UserStatsResponse;
  mutualFriends?: MutualFriend[];
  badges: IBadge[];
  handleMutualFriendPress?: (userId: string) => void;
  friendshipStatus?: ExtendedFriendshipStatus;
  userInfo: {
    avatar: string
    userName: string | null
    fullName: string | null
    bio: string | null
  };
}

const Header: FC<HeaderProps> = (
  {
    userInfo,
    handleSettingsPress,
    handleFavoritesPress,
    handleSavedPress,
    handleFriendsListPress,
    isFriendProfilePage = false,
    statsData,
    mutualFriends,
    handleMutualFriendPress,
    badges,
    friendshipStatus
  },
) => {
  const { userName, fullName, bio, avatar } = userInfo;

  return (
    <>
      <LinearGradient
        colors={['#9F0B08', '#FF7F3F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View />
        {userName && <Text style={styles.username}>@{userName}</Text>}
        <TouchableOpacity onPress={handleSettingsPress}>
          <Feather name="settings" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </View>

      <View style={styles.headerContent}>
        {fullName && <Text style={styles.name}>{fullName}</Text>}
        {bio && <Text style={styles.subtitle}>{bio}</Text>}
        <ProfileStats
          handleFavoritesPress={handleFavoritesPress}
          handleSavedPress={handleSavedPress}
          handleFriendsListPress={handleFriendsListPress}
          favorites={statsData.favoritesCount}
          saved={statsData.savedCount}
          friends={statsData.friendsCount}
        />
        <View style={styles.badgesContainer}>
          {badges.map((badge, index) => (
            <Badge badge={badge} key={index} />
          ))}
        </View>

        {isFriendProfilePage && (
          <View style={styles.actionsWrapper}>
            <Actions friendshipStatus={friendshipStatus} action="message" />
          </View>
        )}

        {mutualFriends && (
          <MutualFriendsSection
            onPress={handleMutualFriendPress}
            friends={mutualFriends}
            totalCount={mutualFriends.length}
          />
        )}

        <Text style={styles.h2}>Past Orders</Text>
      </View>
    </>
  );
};

const AVATAR_SIZE = 105;

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 4,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 120,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 12,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  avatar: {
    backgroundColor: 'white',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: COLORS.red,
    position: 'absolute',
    top: -(AVATAR_SIZE / 2),
    marginBottom: 40,
  },
  avatarWrapper: {
    marginTop: -40,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 60,
  },
  contentWrapper: {
    flex: 1,
    marginTop: AVATAR_SIZE / 2 - 40,
  },
  descriptionWrapper: {
    alignItems: 'center',
  },
  name: {
    fontWeight: '800',
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  actionsWrapper: {
    width: '80%',
  },
  h2: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 20,
    fontWeight: 'semibold',
  },
});

export default Header;
