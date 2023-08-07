export interface IFindAllPayoutAdjustmentTypesQuery {
  execute(
    params: IFindAllPayoutAdjustmentTypesQuery.Input,
  ): IFindAllPayoutAdjustmentTypesQuery.Output;
}

export namespace IFindAllPayoutAdjustmentTypesQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
  };

  export type Output = Promise<AdjustmentType[]>;

  // Additional types
  export type AdjustmentType = {
    id: string;
    name: string;
    slug: string;
  };
}
