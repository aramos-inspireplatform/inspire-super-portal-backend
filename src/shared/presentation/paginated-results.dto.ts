import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultsDto<T> {
  @ApiProperty()
  rows: T[];

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 30 })
  count: number;

  @ApiProperty({ example: 3 })
  pageCount?: number;

  @ApiProperty({ example: true })
  pageNumberIsGood?: boolean;

  @ApiProperty({ example: false })
  hasPreviousPage?: boolean;

  @ApiProperty({ example: true })
  hasNextPage?: boolean;

  @ApiProperty({ example: true })
  isFirstPage?: boolean;

  @ApiProperty({ example: false })
  isLastPage?: boolean;

  @ApiProperty({ example: 1 })
  numberOfFirstItemOnPage?: number;

  @ApiProperty({ example: 1 })
  firstItemOnPage?: number;

  @ApiProperty({ example: 10 })
  numberOfLastItemOnPage?: number;

  @ApiProperty({ example: 10 })
  lastItemOnPage?: number;

  constructor(data: T[], count: number, page: number, pageSize: number) {
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
