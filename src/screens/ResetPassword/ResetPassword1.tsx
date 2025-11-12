import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";
import {emailSchema, EmailSchema} from "../../schemas/auth/email.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {handleApiError} from "../../utils/handleApiError";
import {commonStyles} from "../../components/Auth/common.styles";
import {useResetPassword} from "../../hooks/auth";
import {getInputWrapperStyles} from "../../utils/helpers";
import {COLORS} from "../../constants/colors";

type RootStackParamList = {
  ResetPassword1: undefined;
  ResetPassword2: {userId: string};
  SignUp: undefined;
};

type ResetPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword1"
>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ResetPasswordNavigationProp>();
  const {mutate, isPending} = useResetPassword();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema)
  });

  const onSubmit = async (payload: EmailSchema) => {
    mutate(payload, {
      onSuccess: ({userId}) => {
        navigation.navigate("ResetPassword2", {userId});
      },
      onError: (error) => handleApiError(error),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={22} color="black"/>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>
          Please enter your email{"\n"}to reset the password
        </Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name='email'
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                style={[styles.input, getInputWrapperStyles(value)]}
                placeholder="example@gmail.com"
                placeholderTextColor={COLORS.grey30}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && <Text style={commonStyles.errorText}>{errors.email.message}</Text>}

          <TouchableOpacity
            disabled={!isValid || isPending}
            style={[commonStyles.button, isValid && commonStyles.buttonActive]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={[commonStyles.buttonText, isValid && commonStyles.buttonTextActive]}>
              {isPending ? 'Loading...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
        </View>
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
  form: {
    width: "85%",
    marginTop: 30,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
});
