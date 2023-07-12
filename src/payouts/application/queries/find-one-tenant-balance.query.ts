import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { IFindOneTenantBalanceQuery } from '~/payouts/application/queries/contracts/find-one-tenant-balance.query.contract';

export class FindOneTenantBalanceQuery implements IFindOneTenantBalanceQuery {
  constructor(
    private readonly findOneTenantBalanceDao: IFindOneTenantBalanceDao,
  ) {}

  async execute(
    attrs: IFindOneTenantBalanceQuery.Input,
  ): IFindOneTenantBalanceQuery.Output {
    const tenantBalance = await this.findOneTenantBalanceDao.execute({
      ...attrs,
    });
    if (tenantBalance instanceof Error) throw tenantBalance;

    return null;
  }
}
