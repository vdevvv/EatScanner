export type User = {
  id: string
  email: string
  fullName: string | null
  userName: string | null
  bio: string | null
  avatar: string
  phone: string | null
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface UpdateUserDto {
  fullName?: string;
  userName?: string;
  phone?: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface UserStatsResponse {
  friendsCount: number;
  savedCount: number;
  favoritesCount: number;
}

export interface AvatarUploadParams {
  uri: string;
  type: string;
  name: string;
}

export interface Badge {
  text: string;
  emoji: string;
  color1: string;
  color2: string;
}