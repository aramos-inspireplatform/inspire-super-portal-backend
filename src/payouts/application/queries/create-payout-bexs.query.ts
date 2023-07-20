import { ICreatePayoutBexsDao } from '~/payouts/application/daos/create-payout-bexs.dao.contract';
import { ICreatePayoutBexsQuery } from '~/payouts/application/queries/contracts/create-payout-bexs.query.contract';

export class CreatePayoutBexsQuery implements ICreatePayoutBexsQuery {
  constructor(private readonly createPayoutBexsDao: ICreatePayoutBexsDao) {}

  async execute(
    attrs: ICreatePayoutBexsQuery.Input,
  ): Promise<ICreatePayoutBexsQuery.Output> {
    const file = await this.createPayoutBexsDao.execute({
      accessToken: attrs.accessToken,
      gTenantId: attrs.gTenantId,
      periodStartDate: attrs.periodStartDate,
      periodEndDate: attrs.periodEndDate,
      file: attrs.file,
    });

    return file;
  }
}
