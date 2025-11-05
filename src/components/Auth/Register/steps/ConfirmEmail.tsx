import React, {FC, useEffect, useState} from 'react';
import {commonStyles} from "../../common.styles";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StepProps} from "./types";
import {handleApiError} from "../../../../utils/handleApiError";
import Toast from 'react-native-toast-message';
import {OtpInput} from "react-native-otp-entry";
import {COLORS} from "../../../../constants/colors";
import {useResendCode, useVerifyCode} from "../../../../hooks/auth";

const ConfirmEmail: FC<StepProps> = ({commonData, setCommonData, onNext}) => {
  const {mutate: mutateVerify, isPending} = useVerifyCode()
  const {mutate: mutateResend} = useResendCode()
  const [timer, setTimer] = useState<number>(20);
  const [code, setCode] = useState<string>('');
  const isFilled = code.length === 5;

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  const resendCode = async () => {
    setTimer(20);
    mutateResend({userId: commonData?.userId}, {
      onSuccess: (data) => {
        Toast.show({
          type: 'success',
          text1: data.message
        })
        setCode('');
      },
      onError: (error) => handleApiError(error),
    })
  };

  const handleConfirm = async () => {
    if (isFilled) {
      mutateVerify({code, userId: commonData?.userId, type: 'email_verification'}, {
        onSuccess: (data) => {
          setCommonData?.(prev => ({...prev, emailVerificationToken: data.token}))
          onNext?.()
        },
        onError: (error) => handleApiError(error)
      })
    }
  }

  return (
    <>
      <View style={commonStyles.descriptionContainer}>
        <Text style={commonStyles.descriptionTitle}>Enter confirmation code</Text>
        <Text style={commonStyles.descriptionSubtitle}>
          We’ve sent an SMS with an activation code to your email {commonData?.email}
        </Text>
      </View>

      <View style={{alignItems: "center",}}>
        <OtpInput
          numberOfDigits={5}
          type='numeric'
          onTextChange={(value) => setCode(value)}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
            focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
            focusStickStyle: styles.focusStickStyle,
            pinCodeTextStyle: styles.pinCodeText,
          }}
        />
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, isFilled && styles.confirmButtonActive]}
        disabled={!isFilled || isPending}
        onPress={handleConfirm}
      >
        <Text style={[styles.confirmText, isFilled && styles.confirmTextActive]}>
          {isPending ? 'Loading...' : 'Confirm'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resendCode}>
        <Text style={[styles.resendText, timer > 0 && {textDecorationLine: 'underline'}]}>
          <Text style={{fontWeight: 600}}>Send code again{" "}</Text>
          {timer > 0 && (timer < 10 ? `00:0${timer}` : `00:${timer}`)}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.stroke1,
    marginBottom: 10,
    width: "100%",
    marginTop: 30,
  },
  confirmButtonActive: {backgroundColor: COLORS.orange,},
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.grey30,
  },
  resendText: {
    color: COLORS.grey30,
    textAlign: "center",
    marginBottom: 20,
  },
  otpContainer: {
    marginTop: 20,
    width: '80%',
  },
  pinCodeContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke1,
  },
  filledPinCodeContainer: {
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  pinCodeText: {
    fontSize: 22,
    color: COLORS.black,
  },
  focusedPinCodeContainerStyle: {borderColor: 'inherit'},
  focusStickStyle: {backgroundColor: COLORS.black},
  confirmTextActive: {color: COLORS.white}
})

export default ConfirmEmail;
