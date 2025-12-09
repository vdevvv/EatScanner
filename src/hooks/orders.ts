import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../services/orders.service';
import { handleApiError } from '../utils/handleApiError';
import { OrderDto } from '../types';

export const useGetMyOrders = (take = 20) => {
  return useInfiniteQuery({
    queryKey: ['my-orders', take],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      ordersService.getMyOrders({
        page: pageParam,
        take,
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

export const useGetUserOrders = (userId: string, take = 20) => {
  return useInfiniteQuery({
    queryKey: ['user-orders', take, userId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => ordersService.getUserOrders(
      userId,
      {
        page: pageParam,
        take,
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

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderDto) => ordersService.createOrder(data),
    onError: (err) => handleApiError(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['my-orders'] });
    },
  });
};
