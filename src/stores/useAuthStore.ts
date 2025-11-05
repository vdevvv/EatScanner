import {create} from "zustand";
import * as SecureStore from "expo-secure-store";
import {User} from "../types";
import {userService} from "../services/user.service";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

type AuthState = {
  user: User | null;
  isAuth: boolean;
  signIn: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUserOnStartup: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,

  signIn: async (accessToken, refreshToken) => {
    try {
      await Promise.all([
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
        SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
      ]);
      const user = await userService.getMe()
      set({user, isAuth: true});
    } catch (e) {
      console.error("Error saving tokens:", e);
    }
  },

  signOut: async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
      ]);
    } catch (e) {
      console.error("Failed to sign out", e);
    } finally {
      set({user: null, isAuth: false});
    }
  },

  loadUserOnStartup: async () => {
    try {
      const user = await userService.getMe()
      set({user, isAuth: true});
    } catch (e) {
      set({user: null, isAuth: false})
    }
  }
}))