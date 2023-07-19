export interface IReconcileStripeCommand {
  execute(
    params: IReconcileStripeCommand.Input,
  ): IReconcileStripeCommand.Output;
}

export namespace IReconcileStripeCommand {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  export type Output = Promise<void>;
}
