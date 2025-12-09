import { api } from '../utils/api';
import { Friend, FriendRequestUser, MutualFriend, PaginatedResponse, PaginateOptions } from '../types';

class FriendsService {
  async getMyFriends(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Friend>>('/friends/my-friends', { params: paginateOptions })
      .then(({ data }) => data);
  }

  async removeFriend(friendId: string) {
    await api.delete(`friends/${friendId}`);
  }

  async getSentRequests(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<FriendRequestUser>>('/friends/sent-requests', { params: paginateOptions })
      .then(({ data }) => data);
  }

  async getReceivedRequests(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<FriendRequestUser>>('/friends/received-requests', { params: paginateOptions })
      .then(({ data }) => data);
  }

  async acceptRequest(requestId: string) {
    return api.patch<void>(`/friends/accept/${requestId}`).then(({ data }) => data);
  }

  async rejectRequest(requestId: string) {
    return api.patch<void>(`/friends/reject/${requestId}`).then(({ data }) => data);
  }

  async cancelRequest(requestId: string) {
    return api.patch<void>(`/friends/cancel/${requestId}`).then(({ data }) => data);
  }

  async getMutationFriends(userId: string) {
    return api.get<MutualFriend[]>(`friends/mutual/${userId}`)
      .then(({ data }) => data);
  }
}

export const friendsService = new FriendsService();