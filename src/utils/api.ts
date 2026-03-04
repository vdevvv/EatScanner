import axios, {AxiosError} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";
import {Tokens} from "../components/Auth/Login/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

let isAuthenticatedSession = false;
let unauthorizedHandler: null | (() => Promise<void> | void) = null;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  // console.log(token)
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

export const setAuthSessionStatus = (isAuthenticated: boolean) => {
  isAuthenticatedSession = isAuthenticated;
};

export const setUnauthorizedHandler = (handler: (() => Promise<void> | void) | null) => {
  unauthorizedHandler = handler;
};

export const getReadOnlyApiClient = () => {
  return isAuthenticatedSession ? api : apiPublic;
}

const refreshAuthLogin = async (failedRequest: AxiosError) => {
  try {
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      return Promise.reject(new Error('No refresh token available'));
    }
    const {data: tokens} = await apiPublic.post<Tokens>('/auth/refresh-token', {refreshToken})

    await Promise.all([
      SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);

    if (failedRequest.response) {
      failedRequest.response.config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return Promise.resolve()
  } catch (e) {
    isAuthenticatedSession = false;

    if (unauthorizedHandler) {
      await unauthorizedHandler();
    } else {
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
      ]);
    }
    return Promise.reject(e);
  }
}

createAuthRefreshInterceptor(api, refreshAuthLogin)
