import { PaginationInput } from '~/shared/application/services/pagination';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantPayoutsQuery {
  execute(
    params: IFindAllTenantPayoutsQuery.Input,
  ): IFindAllTenantPayoutsQuery.Output;
}

export namespace IFindAllTenantPayoutsQuery {
  export type Input = {
    pagination: PaginationInput;
  };

  export type Output = QueryPaginatedOutput<TenantPayouts>;

  // Additional types
  export type TenantPayouts = {
    // id: string;
    // date: Date;
    // status: string;
    // amount: number;
    // receivedAmount: number;
    // feeAmount: number;
    // payableAmount: number;
    // profitAmount: number;
    // paymentProcessorName: string;
    // paymentMethodName: string;
    // creditCardBrandName: string;
    // installments: number;
    // paymentProcessorId: string;
    // reconciliationMethod: string;
    // paymentProcessorConfirmation: string;
  };
}
