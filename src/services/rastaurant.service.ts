import {
  DiscoveryResponse,
  FilterTag,
  MenuItemResponse,
  PaginatedResponse,
  PaginateOptions,
  RestaurantResponse, RestaurantResponse2,
  RestaurantReviewsResponse, SearchMenuItemsParams,
} from '../types';
import {api, getReadOnlyApiClient} from '../utils/api';
import {AxiosRequestConfig} from 'axios';

class RestaurantService {
  async getRestaurants(coords: { latitude: number, longitude: number }, paginateOptions?: PaginateOptions) {
    const params = {...paginateOptions, ...coords};
    const client = getReadOnlyApiClient();

    return client.get<PaginatedResponse<RestaurantResponse2>>('/restaurants', {params})
      .then(({data}) => data);
  }

  async getRatings(placeIds: string[]) {
    const client = getReadOnlyApiClient();
    return client.post<RestaurantReviewsResponse>('/place/reviews', {placeIds})
      .then(({data}) => data);
  }

  async getMenuItem(id: string) {
    const client = getReadOnlyApiClient();
    return client.get<MenuItemResponse>(`menu/item/${id}`)
      .then(({data}) => data);
  }

  async getMenu(restaurantId: string) {
    const client = getReadOnlyApiClient();
    return client.get<RestaurantResponse['menu']>(`/restaurants/${restaurantId}/menu`)
      .then(({data}) => data);
  }

  async getFilters(isSelectable?: boolean) {
    const client = getReadOnlyApiClient();
    return client.get<Record<string, FilterTag[]>>('/menu/filters', {
      params: isSelectable !== undefined ? {'is-selectable': isSelectable} : undefined,
    })
      .then(({data}) => data);
  }

  async getDiscovery() {
    const client = getReadOnlyApiClient();
    return client.get<Record<string, DiscoveryResponse[]>>('/menu/discovery')
      .then(({data}) => data);
  }

  async searchMenuItems(requestConfig: AxiosRequestConfig<SearchMenuItemsParams>, paginateOptions: PaginateOptions) {
    const client = getReadOnlyApiClient();
    const {data} = await client.get<PaginatedResponse<DiscoveryResponse>>('/menu/search', {
      ...requestConfig, params: {
        ...requestConfig.params ?? {},
        ...paginateOptions
      }
    })

    return data
  }

  async getRecommendations(paginateOptions?: PaginateOptions) {
    const client = getReadOnlyApiClient();
    return client.get<PaginatedResponse<DiscoveryResponse>>('/menu/recommendations', {params: paginateOptions})
      .then(({data}) => data);
  }
}

export const restaurantService = new RestaurantService();
