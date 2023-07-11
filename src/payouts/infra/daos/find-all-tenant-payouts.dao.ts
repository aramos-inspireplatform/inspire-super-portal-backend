import { IFindAllTenantPayoutsDao } from '~/payouts/application/daos/find-all-tenant-payout.dao.contract';
import { ITenantPayoutsRepository } from '~/payouts/infra/contracts/repository/tenant-payouts.contract';

export class FindAllTenantPayoutsDao implements IFindAllTenantPayoutsDao {
  constructor(
    private readonly tenantHistoryRepository: ITenantPayoutsRepository,
  ) {}
  async execute(
    params: IFindAllTenantPayoutsDao.Input,
  ): IFindAllTenantPayoutsDao.Output {
    return await this.tenantHistoryRepository.findAll();
  }
}
