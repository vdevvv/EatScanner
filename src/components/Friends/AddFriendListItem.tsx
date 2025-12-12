import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FriendshipStatus, SearchUser} from "../../types";
import {COLORS} from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";

interface AddFriendListItemProps {
  item: SearchUser
  sendFriendRequest: () => void;
  acceptFriendRequest: () => void;
  onCardPress: () => void;
}

const AddFriendListItem: FC<AddFriendListItemProps> = (
  {
    item,
    sendFriendRequest,
    acceptFriendRequest,
    onCardPress
  }
) => {
  const renderActionButton = (user: SearchUser) => {
    switch (user.friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return (
          <TouchableOpacity style={styles.statusButtonDisabled} disabled>
            <Text style={styles.statusTextDisabled}>Friends</Text>
          </TouchableOpacity>
        );
      case FriendshipStatus.SENT:
        return (
          <TouchableOpacity style={styles.statusButtonDisabled} disabled>
            <Text style={styles.statusTextDisabled}>Requested</Text>
          </TouchableOpacity>
        );
      case FriendshipStatus.RECEIVED:
        return (
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: COLORS.black}]}
            onPress={acceptFriendRequest}
          >
            <Text style={styles.actionButtonText}>Accept</Text>
          </TouchableOpacity>
        );
      case FriendshipStatus.NONE:
      default:
        return (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={sendFriendRequest}
          >
            <Ionicons name="person-add-outline" size={16} color="#fff" style={{marginRight: 4}}/>
            <Text style={styles.actionButtonText}>Add</Text>
          </TouchableOpacity>
        );
    }
  };

  return (
    <TouchableOpacity style={styles.userRow} onPress={onCardPress}>
      <Image source={{uri: item.avatar}} style={styles.avatar}/>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.fullName || item.userName}</Text>
        <Text style={styles.userHandle}>@{item.userName}</Text>
      </View>
      {renderActionButton(item)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eee',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userHandle: {
    fontSize: 14,
    color: '#888',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.red,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statusButtonDisabled: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusTextDisabled: {
    color: '#999',
    fontWeight: '500',
    fontSize: 14,
  },
})

export default AddFriendListItem;