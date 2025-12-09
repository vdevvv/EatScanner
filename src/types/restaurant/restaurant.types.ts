import { PaginateOptions } from '../common/common.types';

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  placeId: string;
}

interface Menu {
  id: string;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  menuId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  discount: number;
  description: string | null;
  video: string | null;
  image: string;
  highlighted: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantResponse extends Restaurant {
  menu: (Menu & {
    categories: (Category & {
      items: MenuItem[]
    })[]
  }) | null;
}

export interface RestaurantResponse2 {
  id: string,
  placeId: string,
  name: string,
  city: string,
  latitude: number,
  longitude: number,
  distance: number,
  items: Array<{
    id: string,
    name: string,
    price: number,
    description: string | null,
    image: string,
    video: string,
    createdAt: string,
    isLiked: boolean,
    isSaved: boolean
  }>
}

export type RestaurantReviewsResponse = Record<string, {
  name: string
  rating: number
  user_ratings_total: number
}>

export type FilterTag = {
  id: string,
  icon: string,
  name: string,
  slug: string,
  type: string,
  created_at: string
}

export interface DiscoveryResponse extends MenuItem {
  category: Category & {
    menu: Menu & {
      restaurant: {
        name: string
        city: string
      }
    }
  };
}

export interface SearchMenuItemsParams extends PaginateOptions {
  query?: string;
  tags: string[];
}

export interface MenuItemResponse {
  name: string;
  description: string | null;
  image: string;
  video: string | null;
  price: string;
  restaurant: {
    name: string
    placeId: string
    rating: number
    talabatUrl: string | null,
    careemUrl: string | null,
    noonFoodUrl: string | null,
    deliverooUrl: string | null
  };
}
