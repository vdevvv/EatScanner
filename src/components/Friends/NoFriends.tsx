import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants/colors";
import NoFriendsIcon from '../icons/NoFriends'

interface NoFriendsProps {
  handleExploreProfiles?: () => void
}

const NoFriends: FC<NoFriendsProps> = ({handleExploreProfiles}) => {
  return (
    <View style={styles.container}>
      <NoFriendsIcon/>
      <Text style={styles.title}>No Friends Yet</Text>
      <Text style={styles.subTitle}>Start connecting with food lovers like you!</Text>
      <TouchableOpacity style={styles.btn} onPress={handleExploreProfiles}>
        <Text style={styles.btnText}>Explore Profiles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 8
  },
  subTitle: {
    fontWeight: 'semibold',
    marginBottom: 30
  },
  btn: {
    paddingVertical: 14,
    width: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.red,
  },
  btnText: {
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: 'bold',
  }
})

export default NoFriends;