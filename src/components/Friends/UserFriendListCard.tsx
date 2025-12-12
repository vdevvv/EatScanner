import React, {FC} from 'react';
import {FriendsAnotherUser} from "../../types";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants/colors";
import Plus from "../icons/Plus";
import Chat from "../icons/Chat";
import Minus from "../icons/Minus";
import {useAcceptFriendRequest, useCancelFriendRequest, useSendFriendRequest} from "../../hooks/friends";

interface UserFriendListCardProps {
  friend: FriendsAnotherUser;
  handlePressUser: (userId: string) => void;
}

const UserFriendListCard: FC<UserFriendListCardProps> = ({friend, handlePressUser}) => {
  const {mutate: sendFriendRequest} = useSendFriendRequest()
  const {mutate: cancelFriendRequest} = useCancelFriendRequest()
  const {mutate: acceptFriendRequest} = useAcceptFriendRequest()

  const renderBtn = (friend: FriendsAnotherUser) => {
    switch (friend.friendshipStatus) {
      case "FRIEND":
        return (
          <TouchableOpacity style={styles.nestedBtn}>
            <Chat/>
            <Text style={styles.nestedBtnText}>Message</Text>
          </TouchableOpacity>
        )
      case 'ME':
        return null
      case 'NONE':
        return (
          <TouchableOpacity style={styles.nestedBtn} onPress={() => sendFriendRequest(friend.id)}>
            <Plus/>
            <Text style={styles.nestedBtnText}>Add Friend</Text>
          </TouchableOpacity>
        )
      case 'SENT':
        return (
          <TouchableOpacity style={styles.nestedBtn} onPress={() => cancelFriendRequest(friend.id)}>
            <Minus/>
            <Text style={[styles.nestedBtnText, {color: COLORS.grey30}]}>Cancel Request</Text>
          </TouchableOpacity>
        )
      case 'RECEIVED':
        return (
          <TouchableOpacity style={styles.nestedBtn} onPress={() => acceptFriendRequest(friend.id)}>
            <Plus/>
            <Text style={styles.nestedBtnText}>Accept request</Text>
          </TouchableOpacity>
        )
    }
  }

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

      {renderBtn(friend)}
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
  nestedBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: "center",
    gap: 5
  },
  nestedBtnText: {
    fontSize: 14,
    color: COLORS.red,
    fontWeight: "500",
  },
})

export default UserFriendListCard;