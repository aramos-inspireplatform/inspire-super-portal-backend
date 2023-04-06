export type InspireHttpResponse<T = any> = {
  body: {
    data: T;
  };
};

export type InspireHttpPaginatedResponse<T = any> = {
  body: {
    data: {
      rows: T[];
      count: number;
      page: number;
      pageSize: number;
      pageCount: number;
      pageNumberIsGood: boolean;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      isFirstPage: boolean;
      isLastPage: boolean;
      numberOfFirstItemOnPage: number;
      firstItemOnPage: number;
      numberOfLastItemOnPage: number;
      lastItemOnPage: number;
    };
  };
};
