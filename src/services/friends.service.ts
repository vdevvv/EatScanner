import {api} from "../utils/api";
import {Friend, PaginatedResponse, PaginateOptions} from "../types";

class FriendsService {
  async getMyFriends(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Friend>>('/friends/my-friends', {params: paginateOptions})
      .then(({data}) => data)
  }

  async removeFriend(friendId: string) {
    await api.delete(`friends/${friendId}`)
  }
}

export const friendsService = new FriendsService();