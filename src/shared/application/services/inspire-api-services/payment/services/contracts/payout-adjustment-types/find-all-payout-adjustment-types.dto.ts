export namespace FindAllPayoutAdjustmentTypesDto {
  // FindAll Payout Payments
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
  };

  export type Result = Promise<AdjustmentType[]>;

  // Additional types
  export type AdjustmentType = {
    id: string;
    name: string;
    slug: string;
  };
}
