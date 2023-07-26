export interface ISynchronizeTenantBalanceCommand {
  execute(
    params: ISynchronizeTenantBalanceCommand.Input,
  ): ISynchronizeTenantBalanceCommand.Output;
}

export namespace ISynchronizeTenantBalanceCommand {
  export type Input = {
    tenantId: string;
    gTenantId: string;
    name: string;
    agency: Agency;
    status: Status;
    terms: Terms;
    balances: Balance[];
  };

  export type Output = Promise<void>;

  // Additional types
  type Agency = {
    id: string;
    name: string;
  };

  type Status = {
    id: string;
  };

  type Terms = {
    recurringIntervalCount: number;
    recurringIntervalId: string;
  };

  type Balance = {
    settlementCurrencyId: string;
    amount: number;
  };
}
