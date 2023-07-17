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

  export type Output = Promise<Payment[]>;

  export type Payment = {
    id: string;
    date: Date;
    amount: number;
    feeAmount: number;
    payableAmount: number;
    profitAmount: number;
    receivedAmount: number;
  };
}
