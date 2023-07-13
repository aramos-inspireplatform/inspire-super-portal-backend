import { DataSource, Repository } from 'typeorm';
import { IFindAllTenantPayoutsDao } from '~/payouts/application/daos/find-all-tenant-payouts.dao.contract';
import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { PaginationOutput } from '~/shared/application/services/pagination';
import { TenantPayouts } from '~/shared/infra/database/entities';

export class FindAllTenantPayoutsDao implements IFindAllTenantPayoutsDao {
  private repository: Repository<TenantPayouts>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(TenantPayouts);
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
        payoutStatus: true,
        processorUsers: true,
        settlementCurrency: true,
        tenantsId: true,
        termsRecurringIntervals: true,
        updaterUsers: true,
        tenants: true,
      },
    });

    const result = new PaginationOutput({
      rows: query[0].map(
        (tenantPayout) =>
          new TenantPayoutsEntity({
            id: tenantPayout.id,
            alternativeId: tenantPayout.alternativeId,
            payoutAlternativeId: tenantPayout.payoutAlternativeId,
            periodStartDate: tenantPayout.periodStartDate,
            periodEndDate: tenantPayout.periodEndDate,
            amount: tenantPayout.amount,
            termsRecurringIntervalCount:
              tenantPayout.termsRecurringIntervalCount,
            customerGrossAmount: tenantPayout.customerGrossAmount,
            customerFeeAmount: tenantPayout.customerFeeAmount,
            paymentGatewayNetAmount: tenantPayout.paymentGatewayNetAmount,
            expectedArrivalDate: tenantPayout.expectedArrivalDate,
            processedDate: tenantPayout.processedDate,
            creatorUsers: tenantPayout.creatorUsers,
            deleterUsers: tenantPayout.deleterUsers,
            payoutStatus: tenantPayout.payoutStatus,
            processorUsers: tenantPayout.processorUsers,
            settlementCurrency: tenantPayout.settlementCurrency,
            tenantsId: tenantPayout.tenantsId,
            termsRecurringIntervals: tenantPayout.termsRecurringIntervals,
            updaterUsers: tenantPayout.updaterUsers,
            tenants: tenantPayout.tenants,
          }),
      ),
      total: query[1],
      page: params.pagination.getPage(),
      size: params.pagination.getSize(),
    });

    return result.getState();
  }
}
