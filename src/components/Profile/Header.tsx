import {LinearGradient} from "expo-linear-gradient";
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {COLORS} from "../../constants/colors";
import Badge from "./Badge";
import React, {FC} from "react";
import ProfileStats from "./ProfileStats";
import Actions from "./Actions";

interface HeaderProps {
  handleSettingsPress: () => void;
  handleSavedPress: () => void;
  handleFriendsListPress: () => void;
  isFriendProfilePage?: boolean
}

const AVATAR_SOURCE = require("../../assets/profile-avatar.jpg") as ImageSourcePropType;

const badges = [
  {
    title: 'Sweet Tooth',
    emoji: '🍰',
    color: '#F31994',
  },
  {
    title: 'Café Connoisseur',
    emoji: '☕️',
    color: '#E17C00',
  },
  {
    title: 'Healthy Hustler',
    emoji: '🥬',
    color: '#08DE00',
  },
  {
    title: 'Spice Lord',
    emoji: '🌶️',
    color: '#CF0000',
  },
]

const Header: FC<HeaderProps> = (
  {
    handleSettingsPress,
    handleSavedPress,
    handleFriendsListPress,
    isFriendProfilePage = false
  }
) => {
  return (
    <>
      <LinearGradient
        colors={["#9F0B08", "#FF7F3F"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      >
        <View/>
        <Text style={styles.username}>@foodie_iryna</Text>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Feather name='settings' size={24} color={COLORS.white}/>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.avatarWrapper}>
        <Image source={AVATAR_SOURCE} style={styles.avatar}/>
      </View>

      <View style={styles.headerContent}>
        <Text style={styles.name}>Iryna Hvozdetska</Text>
        <Text style={styles.subtitle}>Always on the hunt for tasty food</Text>
        <ProfileStats
          handleSavedPress={handleSavedPress}
          handleFriendsListPress={handleFriendsListPress}
          favorites={230}
          saved={46}
          friends={212}
        />
        <View style={styles.badgesContainer}>
          {badges.map((badge, index) => (
            <Badge badge={badge} key={index}/>
          ))}
        </View>

        {isFriendProfilePage && (
          <View style={styles.actionsWrapper}>
            <Actions action='message'/>
          </View>
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
    paddingBottom: 120
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 12,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 4,
    borderColor: COLORS.red,
    position: 'absolute',
    top: -(AVATAR_SIZE / 2),
    marginBottom: 40
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
})

export default Header;
