export interface IFindOneTenantBalanceQuery {
  execute(
    params: IFindOneTenantBalanceQuery.Input,
  ): IFindOneTenantBalanceQuery.Output;
}

export namespace IFindOneTenantBalanceQuery {
  export type Input = {
    tenantId: string;
    settlementCurrencyIsoCode: string;
  };

  export type Output = Promise<TenantBalance>;

  // Additional types
  type TenantBalance = {
    tenant: Tenant;
    agency: Agency;
    terms: Terms;
    lastPayout: LastPayout;
    totalPaid: number;
    balance: Balance;
  };

  type Tenant = {
    id: string;
    name: string;
  };

  type Agency = {
    id: string;
    name: string;
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

  type LastPayout = {
    id: string;
    amount: number;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  type Balance = {
    id: string;
    amount: number;
    settlementCurrency: Currency;
  };

  type Currency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
  };
}
