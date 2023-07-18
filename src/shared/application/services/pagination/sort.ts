export class Sort {
  private sort: string;

  private orderBy: string;

  private direction: string;

  constructor(sort: string) {
    if (!sort) return;
    [this.orderBy, this.direction] = sort.split('.') ?? [];
    this.validate();
  }

  private validate() {
    if (
      this.direction &&
      this.direction !== Sort.Direction.ASC &&
      this.direction !== Sort.Direction.DESC
    )
      throw new Error('SortBy resource must contain "asc" or "desc" direction');
  }

  getState(): Sort.Output {
    return {
      orderBy: this.orderBy,
      direction: this.direction?.toUpperCase(),
    };
  }
}

export namespace Sort {
  export enum Direction {
    ASC = 'asc',
    DESC = 'desc',
  }
  export type Output = {
    orderBy: string;
    direction: string;
  };
}
