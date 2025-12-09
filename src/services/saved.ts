import { api } from '../utils/api';
import { PaginatedResponse, PaginateOptions } from '../types';
import { Saved } from '../types/saved/saved.types';

class SavedService {
  async toggle(menuItemId: string) {
    return api.post<{ status: 'removed' | 'added', isSaved: boolean }>(`/saved/${menuItemId}`)
      .then(({ data }) => data);
  }

  async getMySaved(paginateOptions: PaginateOptions) {
    return api.get<PaginatedResponse<Saved>>('/saved', { params: paginateOptions })
      .then(({ data }) => data);
  }
}

export const savedService = new SavedService();