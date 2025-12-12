import {LoginSchema} from "../schemas/auth/login.schema";
import {apiPublic} from "../utils/api";
import {EmailSchema} from "../schemas/auth/email.schema";
import {UserActionResponse, VerifyCodeResponse} from "../components/Auth/Register/types";
import {Tokens} from "../components/Auth/Login/types";

class AuthService {
  async login(payload: LoginSchema) {
    return apiPublic.post<Tokens>('/auth/login', payload).then(({data}) => data)
  }

  async requestEmailVerification(payload: EmailSchema) {
    return apiPublic.post<UserActionResponse>('/auth/request-email-verification', payload)
      .then(({data}) => data)
  }

  async verifyCode(code: string, userId?: string, type?: 'email_verification' | 'password_reset') {
    const payload = {userId, code, type} as const
    return apiPublic.post<VerifyCodeResponse>('/auth/verify-code', payload)
      .then(({data}) => data)
  }

  async resendVerifyCode(userId?: string) {
    return apiPublic.post<{ message: string }>('/auth/resend-verify-code', {userId, type: 'email_verification'})
      .then(({data}) => data)
  }

  async setPassword(selectedAllergies?: string[], token?: string, password?: string) {
    const payload = {token, password, selectedAllergies}
    return apiPublic.post<UserActionResponse>('/auth/set-password', payload)
      .then(({data}) => data)
  }

  async resetPassword(payload: EmailSchema) {
    return apiPublic.post<{ userId: string }>('/auth/forgot-password', payload)
      .then(({data}) => data)
  }

  async refreshToken(refreshToken: string | null) {
    return apiPublic.post<Tokens>('/auth/refresh-token', {refreshToken})
      .then(({data}) => data)
  }
}

export const authService = new AuthService();