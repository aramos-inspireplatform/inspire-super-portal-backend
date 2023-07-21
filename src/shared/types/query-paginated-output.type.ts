export type QueryPaginatedOutput<T> = Promise<{
  rows: T[];
  page: number;
  pageSize: number;
  count: number;
  pageCount?: number;
  pageNumberIsGood?: boolean;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  numberOfFirstItemOnPage?: number;
  firstItemOnPage?: number;
  numberOfLastItemOnPage?: number;
  lastItemOnPage?: number;
}>;
