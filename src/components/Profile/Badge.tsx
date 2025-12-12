import React, {FC} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Badge as IBadge} from "../../types";

interface BadgeProps {
  badge: IBadge
}

const Badge: FC<BadgeProps> = ({badge}) => {
  return (
    <View style={[styles.container,
      {
        backgroundColor: badge.color2,
        borderWidth: 1,
        borderColor: badge.color1,
      }
    ]}>
      <Text>{badge.emoji}</Text>
      <Text>{badge.text}</Text>
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