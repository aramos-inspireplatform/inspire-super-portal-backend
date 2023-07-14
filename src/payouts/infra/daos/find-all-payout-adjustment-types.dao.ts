import { IFindAllPayoutAdjustmentTypesDao } from '~/payouts/application/daos/find-all-payout-adjustment-types.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class FindAllPayoutAdjustmentTypesDao
  implements IFindAllPayoutAdjustmentTypesDao
{
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IFindAllPayoutAdjustmentTypesDao.Input,
  ): IFindAllPayoutAdjustmentTypesDao.Output {
    const adjustmentTypes =
      await this.inspirePaymentApiService.findAllPayoutAdjustmentTypes({
        ...attrs,
      });

    return adjustmentTypes?.length
      ? adjustmentTypes.map((adjustmentType) => ({
          id: adjustmentType.id,
          name: adjustmentType.name,
          slug: adjustmentType.slug,
        }))
      : [];
  }
}
