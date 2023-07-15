import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllPayoutPaymentsPagedDao {
  execute(
    params: IFindAllPayoutPaymentsPagedDao.Input,
  ): IFindAllPayoutPaymentsPagedDao.Output;
}

export namespace IFindAllPayoutPaymentsPagedDao {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    payoutId: string;
    pagination: {
      page: number;
      pagesize: number;
      sortby?: string;
      keywords?: string;
    };
  };

  export type Output = QueryPaginatedOutput<Payment>;

  // Additional types
  export type Payment = {
    id: string;
    date: Date;
    status: string;
    amount: number;
    receivedAmount: number;
    feeAmount: number;
    payableAmount: number;
    profitAmount: number;
    paymentProcessorName: string;
    paymentMethodName: string;
    creditCardBrandName: string;
    installments: number;
    paymentProcessorId: string;
    reconciliationMethod: string;
    paymentProcessorConfirmation: string;
  };
}
