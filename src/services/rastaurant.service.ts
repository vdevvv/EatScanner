import {
  DiscoveryResponse,
  FilterTag,
  MenuItemResponse,
  PaginatedResponse,
  PaginateOptions,
  RestaurantResponse, RestaurantResponse2,
  RestaurantReviewsResponse, SearchMenuItemsParams,
} from '../types';
import {api} from '../utils/api';
import {AxiosRequestConfig} from 'axios';

class RestaurantService {
  async getRestaurants(coords: { latitude: number, longitude: number }, paginateOptions?: PaginateOptions) {
    const params = {...paginateOptions, ...coords};

    return api.get<PaginatedResponse<RestaurantResponse2>>('/restaurants', {params})
      .then(({data}) => data);
  }

  async getRatings(placeIds: string[]) {
    return api.post<RestaurantReviewsResponse>('/place/reviews', {placeIds})
      .then(({data}) => data);
  }

  async getMenuItem(id: string) {
    return api.get<MenuItemResponse>(`menu/item/${id}`)
      .then(({data}) => data);
  }

  async getMenu(restaurantId: string) {
    return api.get<RestaurantResponse['menu']>(`/restaurants/${restaurantId}/menu`)
      .then(({data}) => data);
  }

  async getFilters(isSelectable?: boolean) {
    return api.get<Record<string, FilterTag[]>>('/menu/filters', {
      params: isSelectable !== undefined ? {'is-selectable': isSelectable} : undefined,
    })
      .then(({data}) => data);
  }

  async getDiscovery() {
    return api.get<Record<string, DiscoveryResponse[]>>('/menu/discovery')
      .then(({data}) => data);
  }

  async searchMenuItems(requestConfig: AxiosRequestConfig<SearchMenuItemsParams>, paginateOptions: PaginateOptions) {
    const {data} = await api.get<PaginatedResponse<DiscoveryResponse>>('/menu/search', {
      ...requestConfig, params: {
        ...requestConfig.params ?? {},
        ...paginateOptions
      }
    })

    return data
  }

  async getRecommendations(paginateOptions?: PaginateOptions) {
    return api.get<PaginatedResponse<DiscoveryResponse>>('/menu/recommendations', {params: paginateOptions})
      .then(({data}) => data);
  }
}

export const restaurantService = new RestaurantService();