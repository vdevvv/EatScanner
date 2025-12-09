export type Friend = {
  id: string,
  email: string,
  fullName: string | null
  userName: string | null
  phone: string | null
  avatar: string
  createdAt: string,
  updatedAt: string
}

export interface FriendRequestUser {
  id: string;
  userId: string;
  userName: string | null;
  fullName: string | null;
  avatar: string;
}

export interface MutualFriend {
  id: string
  fullName: string | null
  userName: string | null
  avatar: string
  bio: string | null
}
