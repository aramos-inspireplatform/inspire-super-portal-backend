export interface ISynchronizeTenantBalanceCommand {
  execute(
    params: ISynchronizeTenantBalanceCommand.Input,
  ): ISynchronizeTenantBalanceCommand.Output;
}

export namespace ISynchronizeTenantBalanceCommand {
  export type Input = {
    tenant: {
      id: string;
      gTenantId: string;
      name: string;
    };
    agency: {
      id: string;
      name: string;
    };
    status: {
      id: string;
    };
    terms: {
      recurringIntervalCount: number;
      recurringIntervalId: string;
    };
  };

  export type Output = Promise<void>;
}
