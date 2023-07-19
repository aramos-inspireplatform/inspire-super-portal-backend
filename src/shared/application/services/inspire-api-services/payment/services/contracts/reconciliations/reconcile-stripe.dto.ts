export namespace ReconcileStripeDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  export type Result = Promise<void>;
}
