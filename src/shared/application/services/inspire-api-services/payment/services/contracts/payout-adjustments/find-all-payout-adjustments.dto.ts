export namespace FindAllPayoutAdjustmentsDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    payoutId: string;
  };

  export type Result = Promise<Adjustment[]>;

  // Additional types
  type Adjustment = {
    id: string;
    description: string;
    amount: number;
    absoluteAmount: number;
    date: Date;
    adjustmentType: AdjustmentType;
    note: string;
  };

  type AdjustmentType = {
    id: string;
    name: string;
    slug: string;
  };
}
