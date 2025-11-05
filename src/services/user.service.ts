import {api} from "../utils/api";
import {User} from "../types";

class UserService {
  async getMe() {
    return api.get<User>('/users/me').then(({data}) => data)
  }
}

export const userService = new UserService();