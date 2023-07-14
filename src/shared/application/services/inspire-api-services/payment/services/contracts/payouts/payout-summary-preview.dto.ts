export namespace PayoutSummaryPreviewDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    payments: Payment[];
    adjustmentFees: AdjustmentFee[];
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
    paymentsReceivedCount: number;
    paymentsFoundCount: number;
    adjustmentFeesAmount: number;
    adjustmentFeesReceivedCount: number;
    feeGroups: string[];
  };
}
