import { IFindOnePayoutSummaryPreviewDao } from '~/payouts/application/daos/find-one-payout-summary-preview.dao.contract';
import { IFindOnePayoutSummaryPreviewQuery } from '~/payouts/application/queries/contracts/find-one-payout-summary-preview.query.contract';

export class FindOnePayoutSummaryPreviewQuery
  implements IFindOnePayoutSummaryPreviewQuery
{
  constructor(
    private readonly findOnePayoutSummaryPreviewDao: IFindOnePayoutSummaryPreviewDao,
  ) {}

  async execute(
    attrs: IFindOnePayoutSummaryPreviewQuery.Input,
  ): IFindOnePayoutSummaryPreviewQuery.Output {
    const payoutSummaryPreview =
      await this.findOnePayoutSummaryPreviewDao.execute({
        ...attrs,
      });
    if (payoutSummaryPreview instanceof Error) throw payoutSummaryPreview;

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
