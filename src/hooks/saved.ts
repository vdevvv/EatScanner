import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { savedService } from '../services/saved';
import { handleApiError } from '../utils/handleApiError';

export const useToggleSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuItemId: string) => savedService.toggle(menuItemId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
    onError: (err) => handleApiError(err),
  });
};

export const getMySaved = (take = 20) => {
  return useInfiniteQuery({
    queryKey: ['my-saved', take],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => savedService.getMySaved({
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

export const useGetUserSaved = (userId: string, take = 20) => {
  return useInfiniteQuery({
    queryKey: ['user-saved', take, userId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => savedService.getUserSaved(userId, {
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
