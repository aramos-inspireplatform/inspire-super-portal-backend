import { IFindAllTenantPayoutsDao } from '~/payouts/application/daos/find-all-tenant-payouts.dao.contract';
import { ITenantPayoutsRepository } from '~/payouts/infra/contracts/repository/tenant-payouts.repository.contract';
import { PaginationOutput } from '~/shared/application/services/pagination';

export class FindAllTenantPayoutsDao implements IFindAllTenantPayoutsDao {
  constructor(
    private readonly tenantPayoutsRepository: ITenantPayoutsRepository,
  ) {}
  async execute(
    params: IFindAllTenantPayoutsDao.Input,
  ): Promise<IFindAllTenantPayoutsDao.Output> {
    const tenantPayouts = await this.tenantPayoutsRepository.findAll({
      pagination: params.pagination,
    });

    const result = new PaginationOutput({
      rows: tenantPayouts[0].map((tenantPayout) => tenantPayout),
      total: tenantPayouts[1],
      page: params.pagination.getPage(),
      size: params.pagination.getSize(),
    });

    return result.getState();
  }
}
