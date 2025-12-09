import { api } from '../utils/api';
import { PaginatedResponse, PaginateOptions } from '../types';
import { Favorites } from '../types/favorites/favorites.types';

class LikesService {
  async toggle(menuItemId: string) {
    return api.post<{ status: 'removed' | 'added', isSaved: boolean }>(`/favorites/${menuItemId}`)
      .then(({ data }) => data);
  }

  async getMyLikes(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Favorites>>('/favorites', { params: paginateOptions })
      .then(({ data }) => data);
  }
}

export const likesService = new LikesService();