export interface IFindAllPayoutAdjustmentTypesDao {
  execute(
    params: IFindAllPayoutAdjustmentTypesDao.Input,
  ): IFindAllPayoutAdjustmentTypesDao.Output;
}

export namespace IFindAllPayoutAdjustmentTypesDao {
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
