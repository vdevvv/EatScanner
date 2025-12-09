import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { handleApiError } from '../utils/handleApiError';
import { likesService } from '../services/likes.service';

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuItemId: string) => likesService.toggle(menuItemId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
    onError: (err) => handleApiError(err),
  });
};

export const useGetMyLikes = (take = 20) => {
  return useInfiniteQuery({
    queryKey: ['my-likes', take],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => likesService.getMyLikes({
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
