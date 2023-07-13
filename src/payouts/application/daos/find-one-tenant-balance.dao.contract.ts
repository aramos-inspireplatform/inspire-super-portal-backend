export interface IFindOneTenantBalanceDao {
  execute(
    params: IFindOneTenantBalanceDao.Input,
  ): IFindOneTenantBalanceDao.Output;
}

export namespace IFindOneTenantBalanceDao {
  export type Input = {
    tenantId: string;
    settlementCurrencyIsoCode: string;
  };

  export type Output = Promise<TenantBalance>;

  // Additional types
  type TenantBalance = {
    id: string;
    name: string;
    gTenantId: string;
    agency: Agency;
    terms: Terms;
    status: Status;
    lastPayout: LastPayout;
    totalPaidAmount: number;
    balance: Balance;
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

  type Status = {
    id: string;
    name: string;
    slug: string;
  };

  type LastPayout = {
    id: string;
    status: PayoutStatus;
    amount: number;
    settlementCurrency: Currency;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  type PayoutStatus = {
    id: string;
    name: string;
    slug: string;
  };

  type Currency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
  };

  type Balance = {
    id: string;
    amount: number;
    settlementCurrency: Currency;
  };
}
