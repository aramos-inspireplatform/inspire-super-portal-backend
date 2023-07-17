export interface IFindOnePayoutSummaryQuery {
  execute(
    params: IFindOnePayoutSummaryQuery.Input,
  ): IFindOnePayoutSummaryQuery.Output;
}

export namespace IFindOnePayoutSummaryQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    payoutId: string;
  };

  export type Output = Promise<PayoutSummaryPreview>;

  // Additional types
  export type Payment = {
    id: string;
  };

  export type AdjustmentFee = {
    adjustmentTypeId: string;
    amount: number;
  };

  export type PayoutSummaryPreview = {
    incomeAmount: number;
    receivedAmount: number;
    feeAmount: number;
    payableAmount: number;
    profitAmount: number;
    paymentsFoundCount: number;
    adjustmentFeesAmount: number;
    adjustmentFeesFoundCount: number;
    feeGroups: string[];
  };
}
