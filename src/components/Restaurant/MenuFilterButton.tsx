import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';

interface MenuFilterButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const MenuFilterButton: FC<MenuFilterButtonProps> = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterButton, isActive && styles.filterButtonActive]}
  >
    <Text style={styles.filterIcon}>{icon}</Text>
    <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.stroke1
  },
  filterButtonActive: { backgroundColor: '#FBE6E3', borderColor: COLORS.black },
  filterIcon: { fontSize: 18, marginRight: 5 },
  filterLabel: { fontSize: 14, fontWeight: '500', color: '#666' },
  filterLabelActive: { color: '#E57373', fontWeight: '700' },
});

export default MenuFilterButton;