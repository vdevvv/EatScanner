import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PasswordSchema, passwordSchema} from "../../schemas/auth/set-password.schema";
import {commonStyles} from "../../components/Auth/common.styles";
import {useSetPassword} from "../../hooks/auth";
import {handleApiError} from "../../utils/handleApiError";
import {COLORS} from "../../constants/colors";
import {getInputWrapperStyles} from "../../utils/helpers";

type RootStackParamList = {
  ResetPassword3: { token: string };
  ResetPassword4: undefined;
  SignUp: undefined;
};

type ResetPassword3NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword3"
>;

type ResetPassword3RouteProp = RouteProp<RootStackParamList, "ResetPassword3">;

export default function SetNewPasswordScreen() {
  const {params: {token}} = useRoute<ResetPassword3RouteProp>();
  const navigation = useNavigation<ResetPassword3NavigationProp>();
  const {mutate, isPending} = useSetPassword()
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {control, handleSubmit, formState: {errors, isValid}} = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {accepted: true}
  })

  const onSubmit = (payload: PasswordSchema) => {
    mutate({token, password: payload.password}, {
      onSuccess: () => navigation.navigate("ResetPassword4"),
      onError: (error) => handleApiError(error),
    })
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="#000"/>
      </TouchableOpacity>

      <Text style={styles.title}>Set a new password</Text>
      <Text style={styles.subtitle}>
        Create a new password. Ensure it differs from{"\n"}
        previous ones for security
      </Text>
      <View style={styles.content}>
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name='password'
            render={({field: {onChange, value, onBlur}}) => (
              <>
                <TextInput
                  style={[styles.input, getInputWrapperStyles(value)]}
                  placeholder="Enter your new password"
                  placeholderTextColor={COLORS.grey30}
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </>
            )}
          />
          {errors.password && <Text style={commonStyles.errorText}>{errors.password.message}</Text>}
        </View>

        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name='confirmPassword'
            render={({field: {onChange, value, onBlur}}) => (
              <>
                <TextInput
                  style={[styles.input, getInputWrapperStyles(value)]}
                  placeholder="Re-enter password"
                  placeholderTextColor={COLORS.grey30}
                  secureTextEntry={!showRepeatPassword}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  onPress={() => setShowRepeatPassword((prev) => !prev)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </>
            )}
          />
          {errors.confirmPassword && <Text style={commonStyles.errorText}>{errors.confirmPassword.message}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.button, isValid && styles.buttonActive]}
          disabled={!isValid || isPending}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[styles.buttonText, isValid && styles.buttonTextActive]}>
            {isPending ? 'Loading...' : 'Update Password'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginBottom: 40,
    marginLeft: 20
  },
  content: {
    width: '85%',
    marginHorizontal: 'auto'
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.stroke2,
    borderRadius: 10,
    paddingLeft: 16,
    fontSize: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.stroke1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  buttonActive: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.grey30,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextActive: {
    color: COLORS.white
  }
});
