import { IFindOnePayoutSummaryDao } from '~/payouts/application/daos/find-one-payout-summary.dao.contract';
import { IFindOnePayoutSummaryQuery } from '~/payouts/application/queries/contracts/find-one-payout-summary.query.contract';

export class FindOnePayoutSummaryQuery implements IFindOnePayoutSummaryQuery {
  constructor(
    private readonly findOnePayoutSummaryDao: IFindOnePayoutSummaryDao,
  ) {}

  async execute(
    attrs: IFindOnePayoutSummaryQuery.Input,
  ): IFindOnePayoutSummaryQuery.Output {
    const payoutSummaryPreview = await this.findOnePayoutSummaryDao.execute({
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
          paymentsFoundCount: payoutSummaryPreview.paymentsFoundCount,
          adjustmentFeesAmount: payoutSummaryPreview.adjustmentFeesAmount,
          adjustmentFeesFoundCount:
            payoutSummaryPreview.adjustmentFeesFoundCount,
          feeGroups: payoutSummaryPreview.feeGroups,
        }
      : null;
  }
}
