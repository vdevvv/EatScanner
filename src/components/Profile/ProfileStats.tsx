import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface ProfileStatsProps {
  favorites: number;
  saved: number;
  friends: number;
  handleSavedPress: () => void;
  handleFriendsListPress: () => void;
  handleFavoritesPress: () => void;
}

const ProfileStats: FC<ProfileStatsProps> = (
  {
    friends,
    favorites,
    saved,
    handleSavedPress,
    handleFriendsListPress,
    handleFavoritesPress
  }
) => {
  return (
    <View style={styles.statsWrapper}>
      <TouchableOpacity style={styles.statButton} onPress={handleFavoritesPress}>
        <Text style={styles.statTitle}>{favorites}</Text>
        <Text>Favorites</Text>
      </TouchableOpacity>
      <View style={styles.divider}/>
      <TouchableOpacity style={styles.statButton} onPress={handleSavedPress}>
        <Text style={styles.statTitle}>{saved}</Text>
        <Text>Saved</Text>
      </TouchableOpacity>
      <View style={styles.divider}/>
      <TouchableOpacity style={styles.statButton} onPress={handleFriendsListPress}>
        <Text style={styles.statTitle}>{friends}</Text>
        <Text>Friends</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  statsWrapper: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 16,
    marginBottom: 24
  },
  statButton: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: '#B9B9B9',
    alignSelf: 'center',
  },
})

export default ProfileStats;