export namespace CreatePayoutDto {
  type AdjustmentFee = {
    id?: string;
    amount: number;
    date: Date;
    note: string;
    description: string;
  };

  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    payoutId: string;
    command: string;
    periodStartDate: Date;
    periodEndDate: Date;
    termsRecurringIntervalCount: number;
    termsRecurringIntervalId: string;
    selectedPayments: string[];
    adjustmentFees: AdjustmentFee[];
    selectAllPayments: boolean;
  };

  export type Result = Promise<void>;
}
