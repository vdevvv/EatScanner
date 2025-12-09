import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { friendsService } from '../services/friends.service';
import { handleApiError } from '../utils/handleApiError';

export const useMyFriends = (search: string, take = 20) => {
  return useInfiniteQuery({
    queryKey: ['my-friends', search],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => friendsService.getMyFriends({
      search,
      page: pageParam,
      take
    }),
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta;
      if (page < pageCount) {
        return page + 1;
      }
      return undefined;
    },
  });
};

export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) => friendsService.removeFriend(friendId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['my-friends'] });
      await queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
    onError: (error) => handleApiError(error),
  });
};

export const useGetSentRequests = (take = 20) => {
  return useInfiniteQuery({
    queryKey: ['sent-requests'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => friendsService.getSentRequests({
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
  });
};

export const useGetReceivedRequests = (take = 20) => {
  return useInfiniteQuery({
    queryKey: ['received-requests'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => friendsService.getReceivedRequests({
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
  });
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => friendsService.acceptRequest(requestId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['received-requests'] });
      await queryClient.invalidateQueries({ queryKey: ['my-friends'] });
      await queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
    onError: (error) => handleApiError(error),
  });
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => friendsService.rejectRequest(requestId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['received-requests'] });
    },
    onError: (error) => handleApiError(error),
  });
};

export const useCancelFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => friendsService.cancelRequest(requestId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sent-requests'] });
    },
    onError: (error) => handleApiError(error),
  })
}

export const useGetMutationFriends = (userId: string) => {
  return useQuery({
    queryKey: ['my-friends', userId],
    queryFn: () => friendsService.getMutationFriends(userId)
  })
}
