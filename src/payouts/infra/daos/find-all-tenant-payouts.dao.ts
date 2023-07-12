import { DataSource, Repository } from 'typeorm';
import { IFindAllTenantPayoutsDao } from '~/payouts/application/daos/find-all-tenant-payouts.dao.contract';
import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { PaginationOutput } from '~/shared/application/services/pagination';
import { TenantPayouts } from '~/shared/infra/database/entities';

export class FindAllTenantPayoutsDao implements IFindAllTenantPayoutsDao {
  private repository: Repository<TenantPayoutsEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository =
      this.dataSource.getRepository<TenantPayoutsEntity>(TenantPayouts);
  }
  async execute(
    params: IFindAllTenantPayoutsDao.Input,
  ): Promise<IFindAllTenantPayoutsDao.Output> {
    const query = await this.repository.findAndCount({
      skip: params.pagination.skip(),
      take: params.pagination.take(),
      relations: {
        creatorUsers: true,
        deleterUsers: true,
        payoutStatuses: true,
        processorUsers: true,
        settlementCurrencies: true,
        tenantsId: true,
        termsRecurringIntervals: true,
        updaterUsers: true,
        tenants: true,
      },
    });

    const result = new PaginationOutput({
      rows: query[0].map(
        (tenantPayout) => new TenantPayoutsEntity(tenantPayout),
      ),
      total: query[1],
      page: params.pagination.getPage(),
      size: params.pagination.getSize(),
    });

    return result.getState();
  }
}
