export type PaginatedResponse<T> = {
  data: T[];
  metadata: {
    current_page: number;
    total_records: number;
    max_pages: number;
  };
};
