import {
  DiscoveryResponse,
  FilterTag,
  MenuItem,
  PaginatedResponse,
  PaginateOptions,
  RestaurantResponse,
  RestaurantReviewsResponse, SearchMenuItemsParams,
} from '../types';
import { api } from '../utils/api';
import { AxiosRequestConfig } from 'axios';

class RestaurantService {
  async getRestaurants(paginateOptions?: PaginateOptions) {
    return api.get<PaginatedResponse<RestaurantResponse>>('/restaurants', { params: paginateOptions })
      .then(({ data }) => data);
  }

  async getRatings(placeIds: string[]) {
    return api.post<RestaurantReviewsResponse>('/place/reviews', { placeIds })
      .then(({ data }) => data);
  }

  async getMenuItem(id: string) {
    return api.get<MenuItem>(`restaurants/${id}/menu-item`)
      .then(({ data }) => data);
  }

  async getMenu(menuId: string) {
    return api.get<RestaurantResponse['menu']>(`/restaurants/${menuId}/menu`)
      .then(({ data }) => data);
  }

  async getFilters(isSelectable?: boolean) {
    return api.get<Record<string, FilterTag[]>>('/menu/filters', {
      params: isSelectable !== undefined ? { "is-selectable": isSelectable } : undefined,
    })
      .then(({ data }) => data);
  }

  async getDiscovery() {
    return api.get<Record<string, DiscoveryResponse[]>>('/menu/discovery')
      .then(({ data }) => data);
  }

  async searchMenuItems(requestConfig: AxiosRequestConfig<SearchMenuItemsParams>) {
    return api.get<PaginatedResponse<DiscoveryResponse>>('/menu/search', requestConfig)
      .then(({ data }) => data);
  }
}

export const restaurantService = new RestaurantService();