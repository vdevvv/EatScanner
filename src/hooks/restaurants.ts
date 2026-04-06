import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import { restaurantService } from '../services/rastaurant.service';
import { SearchMenuItemsParams } from '../types';
import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const useRestaurants = (
  page: number,
  latitude?: number,
  longitude?: number,
) => {
  return useQuery({
    queryKey: ['restaurants', page],
    queryFn: () => {
      if (!latitude || !longitude) return;
      return restaurantService.getRestaurants({ latitude, longitude }, { page, take: 5 });
    },
    enabled: !!longitude && !!latitude,
    initialData: {
      data: [],
      meta: {
        page: 1,
        take: 5,
        itemsCount: 0,
        pageCount: 1,
      },
    },
  });
};

export const useRatings = (placeIds: string[]) => {
  return useQuery({
    queryKey: ['reviews', placeIds],
    queryFn: () => restaurantService.getRatings(placeIds),
    enabled: placeIds.length > 0,
  });
};

export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => restaurantService.getMenuItem(id),
  });
};

export const useMenu = (restaurantId: string | null) => {
  return useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: () => {
      if (!restaurantId) return null;
      return restaurantService.getMenu(restaurantId);
    },
    enabled: !!restaurantId,
  });
};

export const useFilters = (isSelectable?: boolean) => {
  return useQuery({
    queryKey: ['filters', isSelectable],
    queryFn: () => restaurantService.getFilters(isSelectable),
  });
};

export const useDiscovery = () => {
  return useQuery({
    queryKey: ['discovery'],
    queryFn: () => restaurantService.getDiscovery(),
  });
};

export const useSearchMenuItems = (
  params: SearchMenuItemsParams,
  take = 10,
) => {
  const requestConfig: AxiosRequestConfig<SearchMenuItemsParams> = {
    params: {
      take,
      ...(params.query ? { query: params.query } : {}),
      ...(params.tags?.length ? { tags: params.tags } : {}),
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };

  const shouldFetch =
    (params.query && params.query.length > 0) ||
    (params.tags && params.tags.length > 0)

  return useInfiniteQuery({
    queryKey: ['search-menu-items', requestConfig.params],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => restaurantService.searchMenuItems(requestConfig, {
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
    enabled: shouldFetch
  });
};

export const useGetRecommendations = (tag: string, take = 10) => {
  return useInfiniteQuery({
    queryKey: ['menu-recommendations'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => restaurantService.getRecommendations({
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
    enabled: tag === 'recommended-for-you',
  })
}
