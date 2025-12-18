import {FC, RefObject, useCallback, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import BottomSheet, {BottomSheetView, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {COLORS} from '../../constants/colors';

interface PhoneVerificationSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  snapPoints: string[];
  phoneNumber: string | null;
  isLoading: boolean;
  onSubmitCode: (code: string) => void;
  onResendCode: () => void;
}

const PhoneVerificationSheet: FC<PhoneVerificationSheetProps> = (
  {
    bottomSheetRef,
    snapPoints,
    phoneNumber,
    isLoading,
    onSubmitCode,
    onResendCode,
  }) => {
  const [code, setCode] = useState('');

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1}/>,
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={{backgroundColor: '#fff', borderRadius: 24}}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Verify Phone Number</Text>
        <Text style={styles.subtitle}>
          Enter the code sent to {phoneNumber}
        </Text>

        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="123456"
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
        />

        <TouchableOpacity
          style={[styles.button, (!code || code.length < 6) && styles.disabledButton]}
          onPress={() => onSubmitCode(code)}
          disabled={isLoading || code.length < 6}
        >
          {isLoading ? <ActivityIndicator color="#fff"/> : <Text style={styles.buttonText}>Verify</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendBtn} onPress={onResendCode}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 24,
    letterSpacing: 5,
    marginBottom: 24,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.red,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resendBtn: {
    padding: 8,
  },
  resendText: {
    color: COLORS.red,
    fontSize: 14,
  },
});

export default PhoneVerificationSheet;