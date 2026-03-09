import {api} from '../utils/api';
import {AvatarUploadParams, Badge, UpdatePasswordDto, UpdateUserDto, User, UserStatsResponse} from '../types';

class UserService {
  async getMe() {
    return api.get<User>('/users/me').then(({data}) => data);
  }

  async getById(id: string) {
    return api.get<User>(`/users/${id}`).then(({data}) => data);
  }

  async updateMe(data: UpdateUserDto) {
    return api.patch<User>('/users/me', data).then(({data}) => data);
  }

  async updatePassword(data: UpdatePasswordDto) {
    return api.patch<{ message: string }>('/users/password', data)
      .then(({data}) => data);
  }

  async getUserStats(id: string) {
    return api.get<UserStatsResponse>(`/users/${id}/stats`)
      .then(({data}) => data);
  }

  async getMyStats() {
    return api.get<UserStatsResponse>('/users/my-stats')
      .then(({data}) => data);
  }

  async uploadAvatar(asset: AvatarUploadParams) {
    const formData = new FormData();
    //@ts-ignore
    formData.append('file', {
      uri: asset.uri,
      name: asset.name,
      type: asset.type,
    });

    return api.patch<User>('users/avatar', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(({data}) => data);
  }

  async deleteAvatar() {
    return api.delete<User>('users/avatar').then(({data}) => data);
  }

  async getMyBadges() {
    return api.get<Badge[]>('/users/badges/my')
      .then(({data}) => data);
  }

  async getUserBadges(userId: string) {
    return api.get<Badge[]>(`/users/badges/${userId}`)
      .then(({data}) => data);
  }
  async initiatePhoneUpdate(phone: string ) {
    return api.post<{message: string}>('/users/phone/initiate', { phone })
  }

  async confirmPhoneUpdate(code: string ) {
    return api.post<User>('/users/phone/confirm', { code }).then(res => res.data)
  }

  async toggleNotifications(notificationsEnabled: boolean) {
    return api.patch<User>('/users/notifications', {notificationsEnabled})
      .then(({data}) => data);
  }

  async deleteMe() {
    return api.delete<{ message: string }>('/users/me').then(({data}) => data);
  }
}

export const userService = new UserService();
