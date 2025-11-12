export interface Restaurant {
  id: string
  name: string
  city: string
  country: string
  address: string
  latitude: number
  longitude: number
  googleRating: string | null
  trustpilotRating: string | null
  createdAt: string
  updatedAt: string
}

interface Menu {
  id: string
  restaurantId: string
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  menuId: string
  createdAt: string
  updatedAt: string
}

export interface MenuItem {
  id: string
  name: string
  price: string
  description: string | null
  video: string | null
  image: string
}

export interface RestaurantResponse extends Restaurant {
  menu: (Menu & {
    categories: (Category & {
      items: MenuItem[]
    })[]
  }) | null
}
