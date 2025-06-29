export type PageResponse<T> = {
  data: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
};
