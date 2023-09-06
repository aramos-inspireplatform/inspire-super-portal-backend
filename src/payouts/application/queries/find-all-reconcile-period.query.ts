import { IFindAllReconcilePeriodDao } from '~/payouts/application/daos/find-all-reconcile-period.dao.contract';
import { IFindAllReconcilePeriodQuery } from '~/payouts/application/queries/contracts/find-all-reconcile-period.query.contract';

export class FindAllReconcilePeriodQuery
  implements IFindAllReconcilePeriodQuery
{
  constructor(
    private readonly findAllReconcilePeriodDao: IFindAllReconcilePeriodDao,
  ) {}

  async execute(
    attrs: IFindAllReconcilePeriodQuery.Input,
  ): IFindAllReconcilePeriodQuery.Output {
    const reconciles = await this.findAllReconcilePeriodDao.execute({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
      periodStartDate: attrs.periodStartDate,
      periodEndDate: attrs.periodEndDate,
      status: attrs.status,
    });
    if (reconciles instanceof Error) throw reconciles;

    return reconciles?.map((reconcile) => ({
      id: reconcile.id,
      periodStartDate: reconcile.periodStartDate,
      periodEndDate: reconcile.periodEndDate,
      status: reconcile.status,
      creatorUser: reconcile.creatorUser,
      createdDate: reconcile.createdDate,
    }));
  }
}
