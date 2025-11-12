import React, {FC} from 'react';
import {Friend} from "../../types";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants/colors";

interface FriendListItemProps {
  friend: Friend;
  handlePressUser: (userId: string) => void;
  onRemoveFriend: (friendId: string) => void;
}

const FriendListItem: FC<FriendListItemProps> = ({friend, onRemoveFriend, handlePressUser}) => {
  return (
    <TouchableOpacity style={styles.listItemContainer} onPress={() => handlePressUser(friend.id)}>
      <Image
        source={{uri: friend.avatar}}
        style={styles.avatar}
        resizeMode='cover'
      />
      <View style={styles.userInfo}>
        <Text style={styles.nameText}>{friend.fullName}</Text>
        <Text style={styles.usernameText}>@{friend.userName}</Text>
      </View>

      <TouchableOpacity style={styles.removeButtonContainer} onPress={(e) => {
        e.stopPropagation();
        onRemoveFriend(friend.id)
      }}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
  usernameText: {
    fontSize: 14,
    color: "#555453",
  },
  removeButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(219, 101, 81, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  removeText: {
    fontSize: 14,
    fontWeight: "500",
  },
})

export default FriendListItem;