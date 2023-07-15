export interface IFindAllPayoutAdjustmentsQuery {
  execute(
    params: IFindAllPayoutAdjustmentsQuery.Input,
  ): IFindAllPayoutAdjustmentsQuery.Output;
}

export namespace IFindAllPayoutAdjustmentsQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    payoutId: string;
  };

  export type Output = Promise<Adjustment[]>;

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
