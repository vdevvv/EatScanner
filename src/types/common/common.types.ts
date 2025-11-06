export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number,
    take: number,
    itemsCount: number,
    pageCount: number
  }
}

export type PaginateOptions = Partial<{
  order: 'asc' | 'desc'
  orderBy: string
  page: number
  take: number
  search: string
}>