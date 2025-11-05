import React, {FC, useState} from 'react';
import {commonStyles} from "../../common.styles";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Controller, useForm} from "react-hook-form";
import {PasswordSchema, passwordSchema} from "../../../../schemas/auth/set-password.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {StepProps} from "./types";
import {handleApiError} from "../../../../utils/handleApiError";
import {getInputWrapperStyles} from "../../../../utils/helpers";
import {useSetPassword} from "../../../../hooks/auth";
import {COLORS} from "../../../../constants/colors";

const CreatePassword: FC<StepProps> = ({commonData, onNext}) => {
  const {mutate, isPending} = useSetPassword()
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {accepted: false}
  });

  const onSubmit = async (payload: PasswordSchema) => {
    mutate({token: commonData?.emailVerificationToken, password: payload.password}, {
      onSuccess: () => onNext?.(),
      onError: (error) => handleApiError(error),
    })
  }

  return (
    <>
      <View style={commonStyles.descriptionContainer}>
        <Text style={commonStyles.descriptionTitle}>Create your password</Text>
        <Text style={commonStyles.descriptionSubtitle}>
          Your password must be at least 8 characters, including a number and a symbol.
        </Text>
      </View>
      <Controller
        control={control}
        name='password'
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[commonStyles.inputContainer, getInputWrapperStyles(value)]}>
            <TextInput
              style={commonStyles.input}
              placeholder="Password"
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
                color="#888"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && <Text style={commonStyles.errorText}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name='confirmPassword'
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[commonStyles.inputContainer, getInputWrapperStyles(value)]}>
            <TextInput
              style={commonStyles.input}
              placeholder="Repeat Password"
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
                color="#888"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.confirmPassword && <Text style={commonStyles.errorText}>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          const newVal = !accepted
          setAccepted(newVal)
          setValue('accepted', newVal)
        }}
      >
        <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
          {accepted && <View style={styles.checkboxInner}/>}
        </View>
        <Text style={styles.checkboxLabel}>
          I accept the terms and privacy policy
        </Text>
      </TouchableOpacity>
      {errors.accepted && <Text style={commonStyles.errorText}>{errors.accepted.message}</Text>}

      <TouchableOpacity
        disabled={!isValid || isPending}
        style={[commonStyles.button, isValid && commonStyles.buttonActive]}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={.8}
      >
        <Text style={[commonStyles.buttonText, isValid && commonStyles.buttonTextActive]}>
          {isPending ? 'Loading...' : 'Create Password'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({

  eyeButton: {
    position: "absolute",
    right: 14,
    top: 13,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.black,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: COLORS.black,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.black,
    borderRadius: 5,
  },
  checkboxLabel: {
    color: COLORS.black,
    fontSize: 14,
    flexShrink: 1,
  },
})

export default CreatePassword;