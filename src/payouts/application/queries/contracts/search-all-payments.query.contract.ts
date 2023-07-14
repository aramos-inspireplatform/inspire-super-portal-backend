export interface ISearchAllPayoutPaymentsQuery {
  execute(
    attrs: ISearchAllPayoutPaymentsQuery.Input,
  ): Promise<ISearchAllPayoutPaymentsQuery.Output>;
}

export namespace ISearchAllPayoutPaymentsQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    settlementCurrencyIsoCode: string;
    payoutId?: string | null;
  };

  export type Output = {
    rows: {
      id: string;
      amount: number;
      feeAmount: number;
      payableAmount: number;
      profitAmount: number;
      receivedAmount: number;
    }[];
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
}
