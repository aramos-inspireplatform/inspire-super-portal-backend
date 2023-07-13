import { PaginationInput } from '~/shared/application/services/pagination';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllPayoutPaymentsQuery {
  execute(
    params: IFindAllPayoutPaymentsQuery.Input,
  ): IFindAllPayoutPaymentsQuery.Output;
}

export namespace IFindAllPayoutPaymentsQuery {
  export type Input = {
    pagination: PaginationInput;
  };

  //export type Output = QueryPaginatedOutput<Payment>;
  export type Output = {};

  // Additional types
  export type Payment = {};
}
