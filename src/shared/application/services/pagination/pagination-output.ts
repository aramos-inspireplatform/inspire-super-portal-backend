import { PaginationInput } from './pagination-input';

export class PaginationOutput<T> {
  private total: number;

  private pagination: PaginationInput;

  rows: T[] = [];

  constructor(input: PaginationOutput.Input<T>) {
    this.total = input.total;
    this.rows = input.rows;
    this.pagination = new PaginationInput({
      page: input.page,
      size: input.size,
    });
  }

  private calcTotalPagesAvailable(): number {
    return this.total > 0
      ? Math.ceil(
          parseFloat(`${this.total}`) /
            parseFloat(`${this.pagination.getState().size}`),
        )
      : 0;
  }

  private pageNumberIsGood(pageCount: number): boolean {
    return (
      pageCount > 0 &&
      this.pagination.getState().page <= pageCount &&
      this.pagination.getState().page >= 1
    );
  }

  private hasPreviousPage(pageNumberIsGood: boolean): boolean {
    return pageNumberIsGood && this.pagination.getState().page > 1;
  }

  private hasNextPage(pageNumberIsGood: boolean, pageCount: number): boolean {
    return pageNumberIsGood && this.pagination.getState().page < pageCount;
  }

  private isFirstPage(pageNumberIsGood: boolean): boolean {
    return pageNumberIsGood && this.pagination.getState().page === 1;
  }

  private isLastPage(pageNumberIsGood: boolean, pageCount: number): boolean {
    return pageNumberIsGood && this.pagination.getState().page === pageCount;
  }

  private numberOfFirstItemOnPage(): number {
    return (
      (this.pagination.getState().page - 1) * this.pagination.getState().size +
      1
    );
  }

  private firstItemOnPage(
    pageNumberIsGood: boolean,
    numberOfFirstItemOnPage: number,
  ): number {
    return pageNumberIsGood ? numberOfFirstItemOnPage : 0;
  }

  private numberOfLastItemOnPage(numberOfFirstItemOnPage: number): number {
    return numberOfFirstItemOnPage + this.pagination.getState().page - 1;
  }

  private lastItemOnPage(
    pageNumberIsGood: boolean,
    numberOfLastItemOnPage: number,
  ): number {
    if (!pageNumberIsGood) return 0;

    return numberOfLastItemOnPage > this.total
      ? this.total
      : numberOfLastItemOnPage;
  }

  getState(): PaginationOutput.Output<T> {
    const pageCount = this.calcTotalPagesAvailable();
    const pageNumberIsGood = this.pageNumberIsGood(pageCount);
    const hasPreviousPage = this.hasPreviousPage(pageNumberIsGood);
    const hasNextPage = this.hasNextPage(pageNumberIsGood, pageCount);
    const isFirstPage = this.isFirstPage(pageNumberIsGood);
    const isLastPage = this.isLastPage(pageNumberIsGood, pageCount);
    const numberOfFirstItemOnPage = this.numberOfFirstItemOnPage();
    const numberOfLastItemOnPage = this.numberOfLastItemOnPage(
      numberOfFirstItemOnPage,
    );
    const firstItemOnPage = this.firstItemOnPage(
      pageNumberIsGood,
      numberOfFirstItemOnPage,
    );
    const lastItemOnPage = this.lastItemOnPage(
      pageNumberIsGood,
      numberOfLastItemOnPage,
    );

    return {
      rows: this.rows,
      count: this.total,
      page: this.pagination.getState().page,
      pageSize: this.pagination.getState().size,
      pageCount,
      pageNumberIsGood,
      hasPreviousPage,
      hasNextPage,
      isFirstPage,
      isLastPage,
      numberOfFirstItemOnPage,
      numberOfLastItemOnPage,
      firstItemOnPage,
      lastItemOnPage,
    };
  }
}

export namespace PaginationOutput {
  export type Input<T> = {
    total: number;
    rows: T[];
    page: number;
    size: number;
  };

  export type Output<T> = {
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
    numberOfLastItemOnPage: number;
    firstItemOnPage: number;
    lastItemOnPage: number;
    rows: T[];
  };
}
