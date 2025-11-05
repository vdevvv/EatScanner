import React, {FC} from 'react';
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {commonStyles} from "../../common.styles";
import {Controller, useForm} from "react-hook-form";
import {emailSchema, EmailSchema} from "../../../../schemas/auth/email.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {handleApiError} from "../../../../utils/handleApiError";
import {StepProps} from "./types";
import {useRequestEmailVerification} from "../../../../hooks/auth";
import {getInputWrapperStyles} from "../../../../utils/helpers";
import {COLORS} from "../../../../constants/colors";

const EnterEmail: FC<StepProps> = ({onNext, setCommonData}) => {
  const {mutate, isPending} = useRequestEmailVerification()
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (payload: EmailSchema) => {
    mutate(payload, {
      onSuccess: (data) => {
        setCommonData?.(prev => ({...prev, userId: data.userId, email: payload.email}));
        onNext?.()
      },
      onError: (error) => handleApiError(error),
    })
  }

  return (
    <>
      <View style={commonStyles.descriptionContainer}>
        <Text style={commonStyles.descriptionTitle}>Enter your email</Text>
        <Text style={commonStyles.descriptionSubtitle}>
          We asking your email to send you verification code to confirm your account
        </Text>
      </View>
      <Controller
        control={control}
        name='email'
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[commonStyles.inputContainer, getInputWrapperStyles(value)]}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS.grey30}
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

      <TouchableOpacity
        disabled={!isValid || isPending}
        style={[commonStyles.button, isValid && commonStyles.buttonActive]}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={.8}
      >
        <Text style={[commonStyles.buttonText, isValid && commonStyles.buttonTextActive]}>
          {isPending ? 'Loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default EnterEmail;