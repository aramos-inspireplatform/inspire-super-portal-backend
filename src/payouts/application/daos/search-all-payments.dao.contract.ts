export interface ISearchAllPayoutPaymentsDao {
  execute(
    attrs: ISearchAllPayoutPaymentsDao.Input,
  ): ISearchAllPayoutPaymentsDao.Output;
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

  export type Output = Promise<Payment[]>;

  // Additional types
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
