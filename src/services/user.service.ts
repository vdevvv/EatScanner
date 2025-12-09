import { api } from '../utils/api';
import { AvatarUploadParams, UpdatePasswordDto, UpdateUserDto, User, UserStatsResponse } from '../types';

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

  async getUserStats(id: string) {
    return api.get<UserStatsResponse>(`/users/${id}/stats`)
      .then(({ data }) => data);
  }

  async getMyStats() {
    return api.get<UserStatsResponse>('/users/my-stats')
      .then(({ data }) => data);
  }

  async uploadAvatar(asset: AvatarUploadParams) {
    const formData = new FormData();
    //@ts-ignore
    formData.append('file', {
      uri: asset.uri,
      name: asset.name,
      type: asset.type,
    });

    await api.patch('users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  async deleteAvatar() {
    await api.delete('users/avatar');
  }
}

export const userService = new UserService();