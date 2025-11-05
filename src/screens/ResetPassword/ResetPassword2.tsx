import React, {useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {OtpInput} from "react-native-otp-entry";
import {useVerifyCode} from "../../hooks/auth";
import {handleApiError} from "../../utils/handleApiError";
import {COLORS} from "../../constants/colors";

type RootStackParamList = {
  ResetPassword2: { userId: string };
  ResetPassword3: { token: string };
};

type ResetPassword2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword2"
>;

type ResetPassword2RouteProp = RouteProp<RootStackParamList, "ResetPassword2">;

export default function VerifyCodeScreen() {
  const {params} = useRoute<ResetPassword2RouteProp>();
  const {userId} = params;
  const {mutate, isPending} = useVerifyCode()

  const navigation = useNavigation<ResetPassword2NavigationProp>();
  const [code, setCode] = useState<string>("");
  const isFilled = code.length === 5
  const handleConfirm = async () => {
    if (isFilled) {
      mutate({code, userId, type: 'password_reset'}, {
        onSuccess: ({token}) => {
          navigation.navigate("ResetPassword3", {token});
        },
        onError: (error) => handleApiError(error),
      })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={22} color="black"/>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          We sent a reset link to example@gmail.com{"\n"}
          Enter the 5 digit code mentioned in the email
        </Text>
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

        <TouchableOpacity
          style={[styles.button, isFilled && styles.buttonActive]}
          disabled={!isFilled || isPending}
          onPress={handleConfirm}
        >
          <Text style={[styles.buttonText, isFilled && styles.buttonTextActive]}>
            {isPending ? "Loading..." : "Verify code"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginTop: 10,
    marginLeft: 20,
  },
  content: {
    marginTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    width: "85%",
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.stroke1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonActive: {
    backgroundColor: COLORS.orange,
  },
  buttonText: {
    color: COLORS.grey30,
    fontSize: 15,
    fontWeight: "500",
  },
  buttonTextActive: {
    color: COLORS.white,
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
  focusedPinCodeContainerStyle: {
    borderColor: 'inherit'
  },
  focusStickStyle: {
    backgroundColor: COLORS.black
  }
});
