import axios, {AxiosError} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, useAuthStore} from "../stores/useAuthStore";
import {authService} from "../services/auth.service";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

export const apiPublic = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

const refreshAuthLogin = async (failedRequest: AxiosError) => {
  try {
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
    const tokens = await authService.refreshToken(refreshToken)
    console.log(tokens, 'Token refreshed')

    await Promise.all([
      SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);

    if (failedRequest.response) {
      failedRequest.response.config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return Promise.resolve()
  } catch (e) {
    const signOut = useAuthStore.getState().signOut;
    await signOut()
    return Promise.reject(e);
  }
}

createAuthRefreshInterceptor(api, refreshAuthLogin)