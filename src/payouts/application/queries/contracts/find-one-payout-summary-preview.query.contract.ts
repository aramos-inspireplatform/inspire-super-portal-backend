export interface IFindOnePayoutSummaryPreviewQuery {
  execute(
    params: IFindOnePayoutSummaryPreviewQuery.Input,
  ): IFindOnePayoutSummaryPreviewQuery.Output;
}

export namespace IFindOnePayoutSummaryPreviewQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    payments: Payment[];
    adjustmentFees: AdjustmentFee[];
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
    paymentsReceivedCount: number;
    paymentsFoundCount: number;
    adjustmentFeesAmount: number;
    adjustmentFeesReceivedCount: number;
    feeGroups: string[];
  };
}
