import { IFindOnePayoutSummaryDao } from '~/payouts/application/daos/find-one-payout-summary.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindOnePayoutSummaryDao implements IFindOnePayoutSummaryDao {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindOnePayoutSummaryDao.Input,
  ): IFindOnePayoutSummaryDao.Output {
    const payoutSummaryPreview =
      await this.inspirePaymentApiService.findOnePayoutSummary({
        accessToken: attrs.accessToken,
        gTenantId: attrs.gTenantId,
        payoutId: attrs.payoutId,
      });

    return payoutSummaryPreview
      ? {
          incomeAmount: payoutSummaryPreview.incomeAmount,
          receivedAmount: payoutSummaryPreview.receivedAmount,
          feeAmount: payoutSummaryPreview.feeAmount,
          payableAmount: payoutSummaryPreview.payableAmount,
          profitAmount: payoutSummaryPreview.profitAmount,
          paymentsFoundCount: payoutSummaryPreview.paymentsFoundCount,
          adjustmentFeesAmount: payoutSummaryPreview.adjustmentFeesAmount,
          adjustmentFeesFoundCount:
            payoutSummaryPreview.adjustmentFeesFoundCount,
          feeGroups: payoutSummaryPreview.feeGroups,
        }
      : null;
  }
}
