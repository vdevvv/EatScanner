import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {LoginSchema, loginSchema} from "../../../schemas/auth/login.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextInput, View, Text, TouchableOpacity} from "react-native";
import {commonStyles} from "../common.styles";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {AuthStackParamList} from "../../../navigations/AuthNavigator";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {handleApiError} from "../../../utils/handleApiError";
import {useAuthStore} from "../../../stores/useAuthStore";
import {useSignIn} from "../../../hooks/auth";
import {COLORS} from "../../../constants/colors";
import {getInputWrapperStyles} from "../../../utils/helpers";

type LoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Auth"
>;

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigation<LoginNavigationProp>();
  const {mutate, isPending} = useSignIn()
  const signIn = useAuthStore(store => store.signIn)

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (payload: LoginSchema) => {
    console.log(payload);
    mutate(payload, {
      onSuccess: async (data) => {
        await signIn(data.accessToken, data.refreshToken)
      },
      onError: (error) => handleApiError(error),
    })
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.descriptionContainer}>
        <Text style={commonStyles.descriptionTitle}>Welcome!</Text>
        <Text style={commonStyles.descriptionSubtitle}>
          Discover meals you love.{"\n"}Watch it. Want it. Get it.
        </Text>
      </View>
      <Controller
        control={control}
        name='email'
        render={({field: {onChange, value, onBlur}}) => (
          <View style={[commonStyles.inputContainer, getInputWrapperStyles(value)]}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              style={commonStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />
      {errors.email && <Text style={commonStyles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name='password'
        render={({field: {onChange, value, onBlur}}) => (
          <View style={[commonStyles.inputContainer, getInputWrapperStyles(value)]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              style={commonStyles.input}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              style={commonStyles.eyeIcon}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && <Text style={commonStyles.errorText}>{errors.password.message}</Text>}

      <TouchableOpacity
        disabled={!isValid || isPending}
        style={[commonStyles.button, isValid && commonStyles.buttonActive]}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
      >
        <Text style={[commonStyles.buttonText, isValid && commonStyles.buttonTextActive]}>
          {isPending ? 'Loading...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <View style={commonStyles.resetContainer}>
        <Text style={commonStyles.resetText}>Forgot your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword1")}>
          <Text style={commonStyles.resetLink}>Reset Password</Text>
        </TouchableOpacity>
      </View>

      <View style={commonStyles.termsContainer}>
        <Text style={commonStyles.termsText}>
          By logging in, you confirm you agree to{" "}
          <Text style={commonStyles.link}>Terms and Conditions</Text> and that you
          have read our <Text style={commonStyles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};

export default Login;