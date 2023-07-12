import { DataSource, Repository } from 'typeorm';
import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { Tenants } from '~/shared/infra/database/entities';
import { Tenant } from '~/tenants/domain/entities/tenant.entity';

export class FindOneTenantBalanceDao implements IFindOneTenantBalanceDao {
  private tenantRepository: Repository<Tenant>;

  constructor(private readonly dataSource: DataSource) {
    this.tenantRepository = this.dataSource.getRepository<Tenant>(Tenants);
  }

  async execute(
    attrs: IFindOneTenantBalanceDao.Input,
  ): IFindOneTenantBalanceDao.Output {
    const query = this.tenantRepository
      .createQueryBuilder('tenants')
      .select([
        'tenants.id',
        'tenants.name',
        'tenants.googleTenantId',
        'tenants.agencyId',
        'tenants.agencyName',
        'tenants.termsRecurringIntervalCount',
        'tenants.totalPaidAmount',
        //'tenantStatus.id',
        //'tenantStatus.name',
        //'tenantStatus.slug',
        //'recurringIntervals.id',
        //'recurringIntervals.name',
        //'recurringIntervals.interval',
      ])
      //.innerJoinAndSelect('tenants.tenantStatuses', 'tenantStatus')
      //.innerJoinAndSelect('tenants.recurringIntervals', 'recurringIntervals')
      .where('tenants.id = :tenantId', { tenantId: attrs.tenantId });

    const tenantBalance = await query.getOne();
    //if (!tenantBalance) throw NotFoundError('teste');

    return null;
    // {
    //   tenant: {
    //     id: tenantBalance.id,
    //     name: tenantBalance.name,
    //   },
    //   agency: {
    //     id: tenantBalance.agencyId,
    //     name: tenantBalance.agencyName,
    //   },
    //   terms: {
    //     recurringIntervalCount: tenantBalance.termsRecurringIntervalCount,
    //     recurringInterval: null,
    //     // {
    //     //   id: tenantBalance.termsRecurringInterval.id,
    //     //   name: tenantBalance.termsRecurringInterval.name,
    //     //   interval: tenantBalance.termsRecurringInterval.interval,
    //     // },
    //   },
    //   lastPayout: null,
    //   totalPaid: tenantBalance.totalPaidAmount,
    //   balance: null,
    // };
  }
}
