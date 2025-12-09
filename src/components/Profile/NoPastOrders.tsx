import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const NoPastOrders = ({ subtitle }: { subtitle: string }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/no-past-orders.png')} />
      <Text style={styles.title}>No past orders yet</Text>
      <Text style={styles.paragraph}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 'auto',
    marginTop: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  paragraph: {
    marginTop: 8,
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

export default NoPastOrders;