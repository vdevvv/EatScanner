import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../../components/common/PasswordInput';
import { COLORS } from '../../constants/colors';
import { Controller, useForm } from 'react-hook-form';
import { setNewPasswordSchema, SetNewPasswordSchema } from '../../schemas/user/set-new-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePassword } from '../../hooks/user';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const { mutate, isPending } = useUpdatePassword();
  const { control, handleSubmit, formState: { errors } } = useForm<SetNewPasswordSchema>({
    resolver: zodResolver(setNewPasswordSchema),
  });

  const onSubmit = async (data: SetNewPasswordSchema) => {
    const { oldPassword, newPassword } = data;
    mutate({ oldPassword, newPassword });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Change Password</Text>

        <View style={styles.formContainer}>
          <View>
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Old password"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword.message}</Text>}
          </View>
          <View>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="New password"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}
          </View>
          <View>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Confirm password"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={isPending}
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>{isPending ? 'Loading...' : 'Save changes'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  backButton: { padding: 10, },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {
    gap: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    ...Platform.select({
      ios: { paddingBottom: 35 },
      android: { paddingBottom: 20 },
    }),
  },
  saveButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default ChangePasswordScreen;
