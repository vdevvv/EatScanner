import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '../services/notifications.service';
import { handleApiError } from '../utils/handleApiError';

export const useSendPushToken = () => {
  return useMutation({
    mutationFn: (pushToken: string) => notificationsService.sendPushToken(pushToken),
    onError: (error) => {
      console.log(error);
      handleApiError(error);
    },
  });
};

export const useGetMyNotifications = (take = 20) => {
  return useInfiniteQuery({
    queryKey: ['my-notifications', take],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => notificationsService.getMyNotifications({
      take,
      page: pageParam,
    }),
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta;
      if (page < pageCount) {
        return page + 1;
      }
      return undefined;
    },
    staleTime: 0,
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsService.markAllAsRead(),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ['my-notifications']});
    }
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => notificationsService.markAsRead(notificationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ['my-notifications']});
    }
  });
}
