import React, {FC} from 'react';
import {StyleSheet, Text, View} from "react-native";

interface BadgeProps {
  badge: {
    emoji: string;
    title: string;
    color: string;
  }
}

const Badge: FC<BadgeProps> = ({badge}) => {
  return (
    <View style={[styles.container,
      {
        backgroundColor: `${badge.color}20`,
        borderWidth: 1,
        borderColor: badge.color,
      }
    ]}>
      <Text>{badge.emoji}</Text>
      <Text>{badge.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    width: 'auto',
    borderRadius: 8,
    alignSelf: 'flex-start',
    padding: 6,
    marginHorizontal: 6,
    marginVertical: 4,
  },
})

export default Badge;