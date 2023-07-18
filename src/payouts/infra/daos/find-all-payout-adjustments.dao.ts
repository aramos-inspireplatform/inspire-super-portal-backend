import { IFindAllPayoutAdjustmentsDao } from '~/payouts/application/daos/find-all-payout-adjustments.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindAllPayoutAdjustmentsDao
  implements IFindAllPayoutAdjustmentsDao
{
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindAllPayoutAdjustmentsDao.Input,
  ): IFindAllPayoutAdjustmentsDao.Output {
    const payoutAdjustments =
      await this.inspirePaymentApiService.findAllPayoutAdjustments({
        ...attrs,
      });

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
