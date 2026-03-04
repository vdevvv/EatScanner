import {create} from "zustand";
import * as SecureStore from "expo-secure-store";
import {User} from "../types";
import {userService} from "../services/user.service";
import {setAuthSessionStatus} from "../utils/api";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

type AuthenticatedState = {
  isAuth: true;
  user: User;
};

type UnauthenticatedState = {
  isAuth: false;
  user: null;
};

type AuthActions = {
  signIn: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  exitGuestMode: () => void;
  loadUserOnStartup: () => Promise<void>;
  setUser: (user: User) => void;
};

type AuthStore = (AuthenticatedState | UnauthenticatedState) & AuthActions & {
  isGuest: boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuth: false,
  isGuest: false,

  signIn: async (accessToken, refreshToken) => {
    try {
      await Promise.all([
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
        SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
      ]);
      const user = await userService.getMe()
      setAuthSessionStatus(true);
      set({user, isAuth: true, isGuest: false});
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
      setAuthSessionStatus(false);
      set({user: null, isAuth: false, isGuest: false});
    }
  },

  continueAsGuest: () => {
    setAuthSessionStatus(false);
    set({user: null, isAuth: false, isGuest: true});
  },

  exitGuestMode: () => {
    setAuthSessionStatus(false);
    set({user: null, isAuth: false, isGuest: false});
  },

  loadUserOnStartup: async () => {
    try {
      const user = await userService.getMe()
      setAuthSessionStatus(true);
      set({user, isAuth: true, isGuest: false});
    } catch (e) {
      setAuthSessionStatus(false);
      set({user: null, isAuth: false, isGuest: false})
    }
  },

  setUser: (user: User) => {
    set({user})
  }
}))
