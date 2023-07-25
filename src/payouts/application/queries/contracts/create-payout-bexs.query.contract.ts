export interface ICreatePayoutBexsQuery {
  execute(
    params: ICreatePayoutBexsQuery.Input,
  ): Promise<ICreatePayoutBexsQuery.Output>;
}

export namespace ICreatePayoutBexsQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    file: Buffer;
  };

  export type Output = boolean;
}
