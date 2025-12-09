import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MutualFriend } from '../../types';
import { COLORS } from '../../constants/colors';

interface MutualFriendsSectionProps {
  friends: MutualFriend[];
  totalCount: number;
  onPress?: (userId: string) => void;
}

const MutualFriendsSection: FC<MutualFriendsSectionProps> = (
  {
    friends,
    totalCount,
    onPress,
  },
) => {
  if (friends.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.countText}>{totalCount}</Text>
        <Text style={styles.labelText}>Mutual{'\n'}Friends</Text>
      </View>

      <FlatList
        data={friends}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress?.(item.id)}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingLeft: 20,
  },
  textContainer: {
    marginRight: 16,
    textAlign: 'center',
  },
  countText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    lineHeight: 28,
    textAlign: 'center',
  },
  labelText: {
    fontSize: 13,
    color: COLORS.grey30,
    fontWeight: '400',
    lineHeight: 16,
  },
  listContent: {
    alignItems: 'center',
    paddingRight: 10,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#e1e1e1',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
});

export default MutualFriendsSection;