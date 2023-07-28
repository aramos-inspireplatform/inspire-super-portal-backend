export namespace ReconciliateStripeDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
  };

  export type Result = Promise<void>;
}
