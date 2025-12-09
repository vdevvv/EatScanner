import { api } from '../utils/api';
import { PaginatedResponse, PaginateOptions } from '../types';
import { Notification } from '../types/notifications/notifications.types';

class NotificationsService {
  async sendPushToken(pushToken: string) {
    return api.patch('/users/push-token', { expoPushToken: pushToken })
      .then(({ data }) => data);
  }

  async getMyNotifications(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Notification>>('/notifications', { params: paginateOptions })
      .then(({ data }) => data);
  }

  async markAllAsRead() {
    return api.patch('/notifications/mark-all-read')
      .then(({ data }) => data);
  }

  async markAsRead(notificationId: string) {
    return api.patch(`/notifications/mark-read/${notificationId}`)
  }
}

export const notificationsService = new NotificationsService();