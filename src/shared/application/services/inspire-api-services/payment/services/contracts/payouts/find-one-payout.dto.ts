export namespace FindOnePayoutDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    payoutId: string;
  };

  export type Result = Promise<Payout>;

  // Additional types
  type Payout = {
    id: string;
    status: PayoutStatus;
    amount: number;
    settlementCurrency: SettlementCurrency;
    createdDate: Date;
    processedDate: Date;
    expectedArrivalDate: Date;
    paidDate: string;
    terms: Terms;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  type SettlementCurrency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
  };

  type PayoutStatus = {
    id: string;
    name: string;
    slug: string;
  };

  type Terms = {
    recurringIntervalCount: number;
    recurringInterval: RecurringInterval;
  };

  type RecurringInterval = {
    id: string;
    name: string;
    interval: string;
  };
}
