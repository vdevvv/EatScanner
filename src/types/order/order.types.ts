export type Order = {
  id: string
  userId: string
  menuItemId: string
  restaurantId: string
  deliveryService: string
  price: string
  createdAt: string
  updatedAt: string
  menuItem: {
    id: string
    name: string
    image: string
  }
  restaurant: {
    id: string
    name: string
    address: string
    city: string
  }
}

export type OrderDto = {
  menuItemId: string,
  deliveryService: 'Talabat' | 'Deliveroo' | 'Careem' | 'Noon Food' | 'Uber Eats' | 'Just Eat'
}
