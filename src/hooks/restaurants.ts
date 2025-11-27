import {useQuery} from "@tanstack/react-query";
import {restaurantService} from "../services/rastaurant.service";
import { SearchMenuItemsParams } from '../types';
import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const useRestaurants = (page: number) => {
  return useQuery({
    queryKey: ["restaurants", page],
    queryFn: () => restaurantService.getRestaurants({page, take: 5})
  })
}

export const useRatings = (placeIds: string[]) => {
  return useQuery({
    queryKey: ["reviews", placeIds],
    queryFn: () => restaurantService.getRatings(placeIds),
    enabled: placeIds.length > 0,
  })
}

export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => restaurantService.getMenuItem(id),
  })
}

export const useMenu = (menuId: string | null) => {
  return useQuery({
    queryKey: ["menu", menuId],
    queryFn: () => {
      if (!menuId) return null;
      return restaurantService.getMenu(menuId)
    },
    enabled: !!menuId,
  })
}

export const useFilters = (isSelectable?: boolean) => {
  return useQuery({
    queryKey: ["filters", isSelectable],
    queryFn: () => restaurantService.getFilters(isSelectable),
  })
}

export const useDiscovery = () => {
  return useQuery({
    queryKey: ["discovery"],
    queryFn: () => restaurantService.getDiscovery(),
  })
}

export const useSearchMenuItems = (params: SearchMenuItemsParams) => {
  const requestConfig: AxiosRequestConfig<SearchMenuItemsParams> = {
    params: {
      page: params.page ?? 1,
      take: params.take ?? 5,
      ...(params.query ? { query: params.query } : {}),
      ...(params.tags && params.tags.length > 0 ? { tags: params.tags } : {}),
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };

  const shouldFetch =
    (params.query && params.query.length > 0) ||
    (params.tags && params.tags.length > 0);

  return useQuery({
    queryKey: ["search-menu-items", requestConfig.params],
    queryFn: () => restaurantService.searchMenuItems(requestConfig),
    enabled: shouldFetch,
  })
}