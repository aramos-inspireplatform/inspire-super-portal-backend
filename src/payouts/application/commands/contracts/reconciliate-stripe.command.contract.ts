export interface IReconciliateStripeCommand {
  execute(
    params: IReconciliateStripeCommand.Input,
  ): IReconciliateStripeCommand.Output;
}

export namespace IReconciliateStripeCommand {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  export type Output = Promise<void>;
}
