import React, {FC} from 'react';
import {Friend} from "../../types";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
    color: "#333",
  },
  usernameText: {
    fontSize: 14,
    color: "#999",
  },
  removeButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(229, 115, 115, 0.1)",
    borderWidth: 1,
    borderColor: "#E57373",
  },
  removeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E57373",
  },
})

export default FriendListItem;