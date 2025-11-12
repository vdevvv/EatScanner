import {useQuery} from "@tanstack/react-query";
import {restaurantService} from "../services/rastaurant.service";

export const useRestaurants = (page: number) => {
  return useQuery({
    queryKey: ["restaurants", page],
    queryFn: () => restaurantService.getRestaurants({page, take: 5})
  })
}