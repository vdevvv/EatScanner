import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {COLORS} from "../../constants/colors";

interface ActionsProps {
  action: 'message'
}

const Actions: FC<ActionsProps> = ({action}) => {
  const getAction = () => {
    switch (action) {
      case 'message':
        return 'Send message'
      default:
        return null
    }
  }

  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.text}>{getAction()}</Text>
    </TouchableOpacity>
  );
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