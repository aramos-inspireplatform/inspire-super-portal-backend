import { IFindAllPayoutAdjustmentsDao } from '~/payouts/application/daos/find-all-payout-adjustments.dao.contract';
import { IFindAllPayoutAdjustmentsQuery } from '~/payouts/application/queries/contracts/find-all-payout-adjustments.query.contract';

export class FindAllPayoutAdjustmentsQuery
  implements IFindAllPayoutAdjustmentsQuery
{
  constructor(
    private readonly findAllPayoutAdjustmentsDao: IFindAllPayoutAdjustmentsDao,
  ) {}

  async execute(
    attrs: IFindAllPayoutAdjustmentsQuery.Input,
  ): IFindAllPayoutAdjustmentsQuery.Output {
    const payoutAdjustments = await this.findAllPayoutAdjustmentsDao.execute({
      ...attrs,
    });
    if (payoutAdjustments instanceof Error) throw payoutAdjustments;

    return payoutAdjustments
      ? payoutAdjustments?.map((payoutAdjustment) => ({
          id: payoutAdjustment.id,
          description: payoutAdjustment.description,
          amount: payoutAdjustment.amount,
          absoluteAmount: payoutAdjustment.absoluteAmount,
          date: payoutAdjustment.date,
          adjustmentType: {
            id: payoutAdjustment.adjustmentType.id,
            name: payoutAdjustment.adjustmentType.name,
            slug: payoutAdjustment.adjustmentType.slug,
          },
          note: payoutAdjustment.note,
        }))
      : [];
  }
}
