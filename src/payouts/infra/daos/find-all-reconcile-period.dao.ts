import { IFindAllReconcilePeriodDao } from '~/payouts/application/daos/find-all-reconcile-period.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindAllReconcilePeriodDao implements IFindAllReconcilePeriodDao {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindAllReconcilePeriodDao.Input,
  ): IFindAllReconcilePeriodDao.Output {
    const reconciles =
      await this.inspirePaymentApiService.findAllReconcilePeriod({
        accessToken: attrs.accessToken,
        gTenantId: attrs.gTenantId,
        periodStartDate: attrs.periodStartDate,
        periodEndDate: attrs.periodEndDate,
        status: attrs.status,
      });

    return reconciles
      ? reconciles?.map((reconcile) => ({
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
        }))
      : [];
  }
}
