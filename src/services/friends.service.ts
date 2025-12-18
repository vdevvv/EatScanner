import {api} from '../utils/api';
import {
  ContactPayload,
  Friend,
  FriendRequestUser,
  FriendsAnotherUser,
  MutualFriend,
  PaginatedResponse,
  PaginateOptions,
  SearchUser
} from '../types';

class FriendsService {
  async getMyFriends(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Friend>>('/friends/my-friends', {params: paginateOptions})
      .then(({data}) => data);
  }

  async removeFriend(friendId: string) {
    await api.delete(`friends/${friendId}`);
  }

  async getSentRequests(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<FriendRequestUser>>('/friends/sent-requests', {params: paginateOptions})
      .then(({data}) => data);
  }

  async getReceivedRequests(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<FriendRequestUser>>('/friends/received-requests', {params: paginateOptions})
      .then(({data}) => data);
  }

  async acceptRequest(targetUserId: string) {
    return api.patch<void>(`/friends/accept/${targetUserId}`).then(({data}) => data);
  }

  async rejectRequest(requestId: string) {
    return api.patch<void>(`/friends/reject/${requestId}`).then(({data}) => data);
  }

  async cancelRequest(requestId: string) {
    return api.patch<void>(`/friends/cancel/${requestId}`).then(({data}) => data);
  }

  async getMutationFriends(userId: string) {
    return api.get<MutualFriend[]>(`friends/mutual/${userId}`)
      .then(({data}) => data);
  }

  async searchFriends(queryTerm: string, paginateOptions: PaginateOptions) {
    const {data} = await api.get<PaginatedResponse<SearchUser>>('/friends/search', {
      params: {
        q: queryTerm,
        ...paginateOptions
      }
    })

    return data;
  }

  async sendFriendRequest(userId: string) {
    return api.post<void>(`/friends/request/${userId}`)
  }

  async getUserFriends(userId: string, paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<FriendsAnotherUser>>(`/friends/user-friends/${userId}`, {params: paginateOptions})
      .then(({data}) => data);
  }

  async syncContacts(payload: ContactPayload[]) {
    return api.post<SearchUser[]>('friends/sync-contacts', {contacts: payload})
      .then(({data}) => data);
  }
}

export const friendsService = new FriendsService();