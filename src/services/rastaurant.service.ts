import {PaginatedResponse, PaginateOptions, RestaurantResponse} from "../types";
import {api} from "../utils/api";

class RestaurantService {
  async getRestaurants(paginateOptions?: PaginateOptions) {
    return api.get<PaginatedResponse<RestaurantResponse>>('/restaurants', {params: paginateOptions})
      .then(({data}) => data)
  }
}

export const restaurantService = new RestaurantService()