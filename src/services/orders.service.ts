import { api } from '../utils/api';
import { Order, OrderDto, PaginatedResponse, PaginateOptions } from '../types';

class OrdersService {
  async getMyOrders(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Order>>('/orders/my', {params: paginateOptions})
      .then(({ data }) => data);
  }

  async getUserOrders(userId: string, paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Order>>(`/orders/user-orders/${userId}`, {params: paginateOptions})
      .then(({ data }) => data);
  }

  async createOrder(data: OrderDto) {
    return api.post('/orders', data)
      .then(({ data }) => data);
  }
}

export const ordersService = new OrdersService();