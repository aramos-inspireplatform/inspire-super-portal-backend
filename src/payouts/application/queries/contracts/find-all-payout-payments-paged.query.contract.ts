import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllPayoutPaymentsPagedQuery {
  execute(
    params: IFindAllPayoutPaymentsPagedQuery.Input,
  ): IFindAllPayoutPaymentsPagedQuery.Output;
}

export namespace IFindAllPayoutPaymentsPagedQuery {
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
