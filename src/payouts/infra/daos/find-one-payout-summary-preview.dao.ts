import { IFindOnePayoutSummaryPreviewDao } from '~/payouts/application/daos/find-one-payout-summary-preview.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindOnePayoutSummaryPreviewDao
  implements IFindOnePayoutSummaryPreviewDao
{
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindOnePayoutSummaryPreviewDao.Input,
  ): IFindOnePayoutSummaryPreviewDao.Output {
    const payoutSummaryPreview =
      await this.inspirePaymentApiService.findOnePayoutSummaryPreview({
        ...attrs,
      });

    return payoutSummaryPreview
      ? {
          incomeAmount: payoutSummaryPreview.incomeAmount,
          receivedAmount: payoutSummaryPreview.receivedAmount,
          feeAmount: payoutSummaryPreview.feeAmount,
          payableAmount: payoutSummaryPreview.payableAmount,
          profitAmount: payoutSummaryPreview.profitAmount,
          paymentsReceivedCount: payoutSummaryPreview.paymentsReceivedCount,
          paymentsFoundCount: payoutSummaryPreview.paymentsFoundCount,
          adjustmentFeesAmount: payoutSummaryPreview.adjustmentFeesAmount,
          adjustmentFeesReceivedCount:
            payoutSummaryPreview.adjustmentFeesReceivedCount,
          adjustmentFeesFoundCount:
            payoutSummaryPreview.adjustmentFeesFoundCount,
          feeGroups: payoutSummaryPreview.feeGroups,
        }
      : null;
  }
}
