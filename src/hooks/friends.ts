import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {friendsService} from '../services/friends.service';
import {handleApiError} from '../utils/handleApiError';
import {ContactPayload} from "../types";

export const useMyFriends = (search: string, take = 20) => {
  return useInfiniteQuery({
    queryKey: ['my-friends', search],
    initialPageParam: 1,
    queryFn: ({pageParam = 1}) => friendsService.getMyFriends({
      search,
      page: pageParam,
      take
    }),
    getNextPageParam: (lastPage) => {
      const {page, pageCount} = lastPage.meta;
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
      await queryClient.invalidateQueries({queryKey: ['my-friends']});
      await queryClient.invalidateQueries({queryKey: ['user-stats']});
    },
    onError: (error) => handleApiError(error),
  });
};

export const useGetSentRequests = (take = 20) => {
  return useInfiniteQuery({
    queryKey: ['sent-requests'],
    initialPageParam: 1,
    queryFn: ({pageParam = 1}) => friendsService.getSentRequests({
      take,
      page: pageParam,
    }),
    getNextPageParam: (lastPage) => {
      const {page, pageCount} = lastPage.meta;
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
    queryFn: ({pageParam = 1}) => friendsService.getReceivedRequests({
      take,
      page: pageParam,
    }),
    getNextPageParam: (lastPage) => {
      const {page, pageCount} = lastPage.meta;
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
    mutationFn: (targetUserId: string) => friendsService.acceptRequest(targetUserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['received-requests']});
      await queryClient.invalidateQueries({queryKey: ['my-friends']});
      await queryClient.invalidateQueries({queryKey: ['user-stats']});
      await queryClient.invalidateQueries({queryKey: ['search-friends']});
      await queryClient.invalidateQueries({queryKey: ['user-friends']});
      await queryClient.invalidateQueries({queryKey: ['sync-contacts']});
    },
    onError: (error) => handleApiError(error),
  });
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => friendsService.rejectRequest(requestId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['received-requests']});
    },
    onError: (error) => handleApiError(error),
  });
};

export const useCancelFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: string) => friendsService.cancelRequest(targetUserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['sent-requests']});
      await queryClient.invalidateQueries({queryKey: ['user-friends']});
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

export const useSearchFriends = (queryTerm: string, take = 20) => {
  return useInfiniteQuery({
    queryKey: ['search-friends', queryTerm],
    initialPageParam: 1,
    queryFn: (({pageParam = 1}) => friendsService.searchFriends(queryTerm, {
      take,
      page: pageParam,
    })),
    getNextPageParam: (lastPage) => {
      const {page, pageCount} = lastPage.meta;
      if (page < pageCount) {
        return page + 1;
      }
      return undefined;
    },
    enabled: queryTerm.length > 0,
  })
}

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => friendsService.sendFriendRequest(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['sent-requests']});
      await queryClient.invalidateQueries({queryKey: ['search-friends']});
      await queryClient.invalidateQueries({queryKey: ['user-friends']});
      await queryClient.invalidateQueries({queryKey: ['sync-contacts']});
    }
  })
}

export const useUserFriends = (userId: string, queryTerm: string, take = 20) => {
  return useInfiniteQuery({
    queryKey: ['user-friends', userId, queryTerm],
    initialPageParam: 1,
    queryFn: (({pageParam = 1}) => friendsService.getUserFriends(userId, {
      take,
      page: pageParam,
      search: queryTerm
    })),
    getNextPageParam: (lastPage) => {
      const {page, pageCount} = lastPage.meta;
      if (page < pageCount) {
        return page + 1;
      }
      return undefined;
    },
  })
}

export const useSyncContacts = (payload:  ContactPayload[], enabled: boolean) => {
  return useQuery({
    queryKey: ['sync-contacts'],
    queryFn: () => friendsService.syncContacts(payload),
    enabled,
    initialData: []
  })
}
