export interface IFindAllReconcilePeriodQuery {
  execute(
    params: IFindAllReconcilePeriodQuery.Input,
  ): IFindAllReconcilePeriodQuery.Output;
}

export namespace IFindAllReconcilePeriodQuery {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    status: string;
  };

  export type Output = Promise<Reconcile[]>;

  export type Reconcile = {
    id: string;
    periodStartDate: Date;
    periodEndDate: Date;
    status: ReconciliationStatus;
    creatorUser: User;
    createdDate: Date;
  };

  type ReconciliationStatus = {
    id: string;
    slug: string;
  };

  type User = {
    id: string;
    name: string;
  };
}
