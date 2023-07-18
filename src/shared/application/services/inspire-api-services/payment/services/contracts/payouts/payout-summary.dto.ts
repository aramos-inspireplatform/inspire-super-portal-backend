export namespace FindOnePayoutSummaryDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    payoutId: string;
  };

  export type Result = Promise<PayoutSummaryPreview>;

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
