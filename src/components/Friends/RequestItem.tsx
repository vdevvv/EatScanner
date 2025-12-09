import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FriendRequestUser } from '../../types';

interface RequestItemProps {
  item: FriendRequestUser;
  type: 'sent' | 'received';
  onPress: () => void;
  onAction: () => void;
}

const RequestItem: FC<RequestItemProps> = ({ item, type, onPress, onAction }) => {
  return (
    <TouchableOpacity style={styles.requestItem} onPress={onPress}>
      <Image
        source={{ uri: item.avatar }}
        style={styles.avatar}
      />
      <View style={styles.requestInfo}>
        <Text style={styles.name}>
          {item.fullName || item.userName || 'Unknown User'}
        </Text>
        <Text style={styles.subText}>
          {type === 'sent' ? 'Request sent' : 'Wants to be friends'}
        </Text>
      </View>

      <View style={styles.actions}>
        {type === 'received' ? (
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={onAction}>
            <Text style={styles.actionBtnText}>Confirm</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.actionBtnSecondary} onPress={onAction}>
            <Text style={styles.actionBtnTextSec}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtnPrimary: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionBtnSecondary: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionBtnTextSec: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RequestItem;