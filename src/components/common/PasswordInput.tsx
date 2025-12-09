import React, { FC, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface PasswordInputProps {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
}

const PasswordInput: FC<PasswordInputProps> = (
  {
    label,
    value,
    onChangeText,
  },
) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isVisible}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="••••••••••"
          placeholderTextColor={COLORS.black}
        />
        <TouchableOpacity
          onPress={() => setIsVisible((prev) => !prev)}
          style={styles.toggleButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={isVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {},
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: 8,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 12,
    paddingRight: 15,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
    fontSize: 16,
    color: '#000',
  },
  toggleButton: {
    padding: 5,
  },
});

export default PasswordInput;