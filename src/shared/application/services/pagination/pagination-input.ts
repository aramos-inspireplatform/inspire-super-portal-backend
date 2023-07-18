import { Sort } from './sort';

export class PaginationInput {
  private page: number;

  private size: number;

  private sort: Sort;

  private keywords: string;

  private limit: number;

  constructor(input: Partial<PaginationInput.Input>) {
    this.page = Number(input.page) || 1;
    this.size = Number(input.size) || 10;
    this.limit = Number(input.limit) || undefined;
    this.sort = new Sort(input.sort);
    this.keywords = input.keywords;
    this.validate();
  }

  getPage(): number {
    return this.page === 0 ? 1 : this.page;
  }

  getSize(): number {
    return this.size;
  }

  validate() {
    if (this.getSize() > 50)
      throw new Error('Page size should be less than 50.');
  }

  take(): number {
    return this.getSize();
  }

  skip(): number {
    return (this.getPage() - 1) * this.getSize();
  }

  orderBy(): string {
    return this.sort.getState().orderBy;
  }

  direction(): string {
    return this.sort.getState().direction;
  }

  getState(): PaginationInput.Output {
    return {
      page: this.getPage(),
      size: this.getSize(),
      limit: this.limit,
      keywords: this.keywords,
      orderBy: this.orderBy(),
      direction: this.direction(),
    };
  }
}

export namespace PaginationInput {
  export type Input = {
    page: number;
    size: number;
    sort: string;
    keywords: string;
    limit: number;
  };

  export type Output = {
    page: number;
    size: number;
    keywords: string;
    limit: number;
    orderBy: string;
    direction: string;
  };
}
