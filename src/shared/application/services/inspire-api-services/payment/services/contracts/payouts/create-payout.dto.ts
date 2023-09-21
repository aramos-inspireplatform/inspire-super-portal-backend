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
    settlementCurrencyIsoCode: string;
  };

  export type Response = {
    id: string;
    alternativeId: number;
    statusId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    amount: number;
    termsRecurringIntervalCount: number;
    termsRecurringIntervalId: string;
    customerGrossAmount: number;
    customerFeeAmount: number;
    paymentGatewayNetAmount: number;
    settlementCurrencyId: string;
    processedDate: Date;
    processorUserId: string;
    createdDate: Date;
    creatorUserId: string;
    updatedDate: Date;
    updaterUserId: string;
  };

  export type Result = Promise<Response>;
}
