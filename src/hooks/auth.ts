import {useMutation} from "@tanstack/react-query";
import {authService} from "../services/auth.service";
import {LoginSchema} from "../schemas/auth/login.schema";
import {EmailSchema} from "../schemas/auth/email.schema";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword,
  })
}

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: (data: { userId?: string, code: string, type: 'password_reset' | 'email_verification' }) =>
      authService.verifyCode(data.code, data.userId, data.type),
  })
}

export const useResendCode = () => {
  return useMutation({
    mutationFn: (data: {userId?: string}) => authService.resendVerifyCode(data.userId),
  })
}

export const useSetPassword = () => {
  return useMutation({
    mutationFn: (data: { token?: string, password: string, selectedAllergies?: string[] }) =>
      authService.setPassword(data.selectedAllergies, data.token, data.password)
  })
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: (payload: LoginSchema) => authService.login(payload)
  })
}

export const useRequestEmailVerification = () => {
  return useMutation({
    mutationFn: (payload: EmailSchema) => authService.requestEmailVerification(payload)
  })
}