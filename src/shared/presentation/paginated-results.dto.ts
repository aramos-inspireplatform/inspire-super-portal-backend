import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultsDto<T = any> {
  @ApiProperty({
    example: () => [],
  })
  rows: T[];

  @ApiProperty({ example: 0 })
  page: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  pageCount?: number;

  @ApiProperty()
  pageNumberIsGood?: boolean;

  @ApiProperty()
  hasPreviousPage?: boolean;

  @ApiProperty()
  hasNextPage?: boolean;

  @ApiProperty()
  isFirstPage?: boolean;

  @ApiProperty()
  isLastPage?: boolean;

  @ApiProperty()
  numberOfFirstItemOnPage?: number;

  @ApiProperty()
  firstItemOnPage?: number;

  @ApiProperty()
  numberOfLastItemOnPage?: number;

  @ApiProperty()
  lastItemOnPage?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any, count: number, page: number, pageSize: number) {
    this.rows = data;
    this.count = count ?? 0;
    this.page = page ?? 0;
    this.pageSize = pageSize ?? 10;

    this.pageCount = this.count > 0 ? Math.ceil(count / pageSize) : 0;
    this.pageNumberIsGood =
      this.pageCount > 0 && page <= this.pageCount && page >= 0;
    this.hasPreviousPage = this.pageNumberIsGood && page > 0;
    this.hasNextPage = this.pageNumberIsGood && page + 1 < this.pageCount;
    this.isFirstPage = this.pageNumberIsGood && page === 0;
    this.isLastPage = this.pageNumberIsGood && page + 1 === this.pageCount;
    this.numberOfFirstItemOnPage = this.pageNumberIsGood ? page * pageSize : 0;
    this.firstItemOnPage = this.pageNumberIsGood
      ? this.numberOfFirstItemOnPage
      : 0;
    this.numberOfLastItemOnPage = this.pageNumberIsGood
      ? this.numberOfFirstItemOnPage + this.rows.length - 1
      : 0;
    this.lastItemOnPage = this.pageNumberIsGood ? this.count - 1 : 0;
  }
}
