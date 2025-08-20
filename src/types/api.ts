export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageData<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number?: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
