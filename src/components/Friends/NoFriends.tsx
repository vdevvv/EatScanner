import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants/colors";

const NoFriends = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/not-found.png')}/>
      <Text style={styles.title}>No Friends Yet</Text>
      <Text style={styles.subTitle}>Start connecting with food lovers like you!</Text>
      <TouchableOpacity style={styles.btn}>
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