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
      reconciliationStatusId: attrs.reconciliationStatusId,
    });
    if (reconciles instanceof Error) throw reconciles;

    return reconciles?.map((reconcile) => ({
      transactions: reconcile.transactions,
      id: reconcile.id,
      periodStartDate: reconcile.periodStartDate,
      periodEndDate: reconcile.periodEndDate,
      filename: reconcile.filename,
      filenameExtension: reconcile.filenameExtension,
      processMessage: reconcile.processMessage,
      paymentGateway: reconcile.paymentGateway,
      status: reconcile.status,
      creatorUser: reconcile.creatorUser,
      createdDate: reconcile.createdDate,
      updatedDate: reconcile.updatedDate,
      deletedDate: reconcile.deletedDate,
    }));
  }
}
