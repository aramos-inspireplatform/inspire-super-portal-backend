export interface ICreatePayoutBexsDao {
  execute(
    params: ICreatePayoutBexsDao.Input,
  ): Promise<ICreatePayoutBexsDao.Output>;
}

export namespace ICreatePayoutBexsDao {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    file: Buffer;
  };

  export type Output = boolean;
}
