export interface ISearchAllPayoutPaymentsDao {
  execute(
    attrs: ISearchAllPayoutPaymentsDao.Input,
  ): Promise<ISearchAllPayoutPaymentsDao.Output>;
}

export namespace ISearchAllPayoutPaymentsDao {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    settlementCurrencyIsoCode: string;
    payoutId?: string | null;
  };

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

  //export type Output = QueryPaginatedOutput<Payment>;
  export type Output = Payment[];

  // Additional types
  //export type Payment = {};
}
