import { IFindAllPayoutAdjustmentTypesDao } from '~/payouts/application/daos/find-all-payout-adjustment-types.dao.contract';
import { IFindAllPayoutAdjustmentTypesQuery } from '~/payouts/application/queries/contracts/find-all-payout-adjustment-types.query.contract';

export class FindAllPayoutAdjustmentTypesQuery
  implements IFindAllPayoutAdjustmentTypesQuery
{
  constructor(
    private readonly findAllPayoutAdjustmentTypesDao: IFindAllPayoutAdjustmentTypesDao,
  ) {}

  async execute(
    attrs: IFindAllPayoutAdjustmentTypesQuery.Input,
  ): IFindAllPayoutAdjustmentTypesQuery.Output {
    const adjustmentTypes = await this.findAllPayoutAdjustmentTypesDao.execute({
      ...attrs,
    });
    if (adjustmentTypes instanceof Error) throw adjustmentTypes;

    return adjustmentTypes?.length
      ? adjustmentTypes.map((adjustmentType) => ({
          id: adjustmentType.id,
          name: adjustmentType.name,
          slug: adjustmentType.slug,
        }))
      : [];
  }
}
