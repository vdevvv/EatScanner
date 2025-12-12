import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {COLORS} from "../../constants/colors";
import {ExtendedFriendshipStatus} from "../../types";

interface ActionsProps {
  action: 'message'
  friendshipStatus?: ExtendedFriendshipStatus
}

const Actions: FC<ActionsProps> = ({action, friendshipStatus}) => {
  const getAction = () => {
    switch (friendshipStatus) {
      case 'FRIEND':
        return (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Send message</Text>
          </TouchableOpacity>
        )
      case 'RECEIVED':
        return (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Confirm request</Text>
          </TouchableOpacity>
        )
      case 'SENT':
        return (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Cancel request</Text>
          </TouchableOpacity>
        )
      case 'NONE':
        return (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Sent request</Text>
          </TouchableOpacity>
        )
      default:
        return null
    }
  }

  return getAction();
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.red,
    width: '100%',
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  }
})

export default Actions;