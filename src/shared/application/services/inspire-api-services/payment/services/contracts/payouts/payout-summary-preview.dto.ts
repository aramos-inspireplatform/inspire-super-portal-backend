export namespace FindOnePayoutSummaryPreviewDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    payments: Payment[];
    adjustmentFees: AdjustmentFee[];
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

  type Fee = {
    name: string;
    paymentProcessor: string;
    paymentMethod: string | null;
    cardBrand: string | null;
    startDate: Date | null;
    endDate: Date | null;
    installments: string;
    currency: string;
    amount: number;
  };

  export type FeeGroup = {
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    fees: Fee[];
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
    adjustmentFeesFoundCount: number;
    feeGroups: FeeGroup[];
  };
}
