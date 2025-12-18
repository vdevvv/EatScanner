import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants/colors";
import {SearchUser} from "../../types";

interface InviteFriendCardProps {
  item: SearchUser
  onInvite: (user: SearchUser) => void;
}

const InviteFriendCard: FC<InviteFriendCardProps> = ({item, onInvite}) => {
  return (
    <View style={styles.userRow}>
      <Image source={{uri: item.avatar}} style={styles.avatar}/>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.fullName || 'Unknown'}</Text>
        <Text style={styles.userHandle}>{item.phone}</Text>
      </View>
      <TouchableOpacity
        style={[styles.actionButton, {backgroundColor: COLORS.black}]}
        onPress={() => onInvite(item)}
      >
        <Text style={styles.actionButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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

export default InviteFriendCard;