export namespace SearchAllPayoutPaymentsDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    settlementCurrencyIsoCode: string;
    payoutId?: string | null;
  };
  export type Result = Promise<Payment[]>;

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
