import { api } from '../utils/api';
import { UpdatePasswordDto, UpdateUserDto, User } from '../types';

class UserService {
  async getMe() {
    return api.get<User>('/users/me').then(({ data }) => data);
  }

  async getById(id: string) {
    return api.get<User>(`/users/${id}`).then(({ data }) => data);
  }

  async updateMe(data: UpdateUserDto) {
    return api.patch<User>('/users/me', data).then(({ data }) => data);
  }

  async updatePassword(data: UpdatePasswordDto) {
    return api.patch<{ message: string }>('/users/password', data)
      .then(({ data }) => data);
  }
}

export const userService = new UserService();