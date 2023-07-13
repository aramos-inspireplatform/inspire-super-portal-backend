import { PaginationInput } from '~/shared/application/services/pagination';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllPayoutPaymentsDao {
  execute(
    params: IFindAllPayoutPaymentsDao.Input,
  ): IFindAllPayoutPaymentsDao.Output;
}

export namespace IFindAllPayoutPaymentsDao {
  export type Input = {
    pagination: PaginationInput;
  };

  //export type Output = QueryPaginatedOutput<Payment>;
  export type Output = {};

  // Additional types
  //export type Payment = {};
}
