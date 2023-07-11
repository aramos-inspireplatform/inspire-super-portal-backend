import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllPayoutPaymentsDao {
  execute(
    params: IFindAllPayoutPaymentsDao.Input,
  ): IFindAllPayoutPaymentsDao.Output;
}

export namespace IFindAllPayoutPaymentsDao {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    settlementCurrencyIsoCode: string;
    payoutId?: string | null;
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
