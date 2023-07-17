import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

<<<<<<< HEAD:src/payouts/application/queries/contracts/find-period-payments.query.contract.ts
export interface IFindPeriodPayoutPaymentsQuery {
  execute(
    params: IFindPeriodPayoutPaymentsQuery.Input,
  ): IFindPeriodPayoutPaymentsQuery.Output;
}

export namespace IFindPeriodPayoutPaymentsQuery {
=======
export interface IFindAllPaymentsPeriodPagedQuery {
  execute(
    params: IFindAllPaymentsPeriodPagedQuery.Input,
  ): IFindAllPaymentsPeriodPagedQuery.Output;
}

export namespace IFindAllPaymentsPeriodPagedQuery {
>>>>>>> develop-softo-create-payout:src/payouts/application/queries/contracts/find-all-payments-period-paged.query.contract.ts
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
