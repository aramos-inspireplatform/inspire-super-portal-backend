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
    agency: Agency;
  };

  type Agency = {
    id: string;
    name: string;
  };

  type Terms = {
    recurringIntervalCount: number;
    recurringInterval: RecurringInterval;
  };

  type LastPayout = {
    id: string;
    amount: number;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  type Balance = {
    settlementCurrencyId: string;
    settlementCurrencyIsoCode: string;
    amount: number;
  };

  type RecurringInterval = {
    id: string;
    name: string;
    interval: string;
  };
}
