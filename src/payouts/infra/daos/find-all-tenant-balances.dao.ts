import { DataSource, Repository } from 'typeorm';
import { IFindAllTenantBalancesDao } from '~/payouts/application/daos/find-all-tenant-balances.dao.contract';
import { PaginationOutput } from '~/shared/application/services/pagination';
import { Tenants } from '~/shared/infra/database/entities';

export class FindAllTenantBalancesDao implements IFindAllTenantBalancesDao {
  private tenantRepository: Repository<Tenants>;

  constructor(private readonly dataSource: DataSource) {
    this.tenantRepository = this.dataSource.getRepository(Tenants);
  }
  async execute(
    attrs: IFindAllTenantBalancesDao.Input,
  ): Promise<IFindAllTenantBalancesDao.Output> {
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
        'tenantStatus.id',
        'tenantStatus.name',
        'tenantStatus.slug',
        'termsRecurringInterval.id',
        'termsRecurringInterval.name',
        'termsRecurringInterval.interval',
        'lastTenantPayout.id',
        'lastTenantPayout.amount',
        'lastTenantPayout.periodStartDate',
        'lastTenantPayout.periodEndDate',
        'lastTenantPayout.processedDate',
        'lastTenantPayoutStatus.id',
        'lastTenantPayoutStatus.name',
        'lastTenantPayoutStatus.slug',
        'lastTenantPayoutSettlementCurrency.id',
        'lastTenantPayoutSettlementCurrency.name',
        'lastTenantPayoutSettlementCurrency.isoCode',
        'lastTenantPayoutSettlementCurrency.symbol',
        'tenantBalances.id',
        'tenantBalances.amount',
        'tenantBalanceSettlementCurrency.id',
        'tenantBalanceSettlementCurrency.name',
        'tenantBalanceSettlementCurrency.isoCode',
        'tenantBalanceSettlementCurrency.symbol',
      ])
      .innerJoin('tenants.tenantStatus', 'tenantStatus')
      .innerJoin('tenants.termsRecurringInterval', 'termsRecurringInterval')
      .innerJoin(
        'tenants.tenantBalances',
        'tenantBalances',
        'tenantBalances.amount > 0',
      )
      .innerJoin(
        'tenantBalances.settlementCurrency',
        'tenantBalanceSettlementCurrency',
      )
      .leftJoin('tenants.lastTenantPayout', 'lastTenantPayout')
      .leftJoin('lastTenantPayout.payoutStatus', 'lastTenantPayoutStatus')
      .leftJoin(
        'lastTenantPayout.settlementCurrency',
        'lastTenantPayoutSettlementCurrency',
      );

    if (attrs.authUser.isAgencyAdmin()) {
      if (!attrs.authUser.agencies?.length) return null;

      query.where('tenants.agencyId in (:...agenciesIds)', {
        agenciesIds: attrs.authUser.agencies.map((agency) => agency.id),
      });
    }

    query.orderBy('tenants.name', 'ASC');

    const [tenantBalances, count] = await query
      .skip(attrs.paginationInput.skip())
      .take(attrs.paginationInput.take())
      .getManyAndCount();

    const result = new PaginationOutput({
      rows: tenantBalances?.map((tenantBalance) => ({
        id: tenantBalance.id,
        name: tenantBalance.name,
        gTenantId: tenantBalance.googleTenantId,
        agency: tenantBalance.agencyId
          ? {
              id: tenantBalance.agencyId,
              name: tenantBalance.agencyName,
            }
          : null,
        terms: {
          recurringIntervalCount: tenantBalance.termsRecurringIntervalCount,
          recurringInterval: {
            id: tenantBalance.termsRecurringInterval.id,
            name: tenantBalance.termsRecurringInterval.name,
            interval: tenantBalance.termsRecurringInterval.interval,
          },
        },
        status: {
          id: tenantBalance.tenantStatus.id,
          name: tenantBalance.tenantStatus.name,
          slug: tenantBalance.tenantStatus.slug,
        },
        lastPayout: tenantBalance.lastTenantPayout
          ? {
              id: tenantBalance.lastTenantPayout.id,
              status: {
                id: tenantBalance.lastTenantPayout.payoutStatus.id,
                name: tenantBalance.lastTenantPayout.payoutStatus.name,
                slug: tenantBalance.lastTenantPayout.payoutStatus.slug,
              },
              amount: tenantBalance.lastTenantPayout.amount,
              settlementCurrency: {
                id: tenantBalance.lastTenantPayout.settlementCurrency.id,
                name: tenantBalance.lastTenantPayout.settlementCurrency.name,
                isoCode:
                  tenantBalance.lastTenantPayout.settlementCurrency.isoCode,
                symbol:
                  tenantBalance.lastTenantPayout.settlementCurrency.symbol,
              },
              periodStartDate: tenantBalance.lastTenantPayout.periodStartDate,
              periodEndDate: tenantBalance.lastTenantPayout.periodEndDate,
              processedDate: tenantBalance.lastTenantPayout.processedDate,
            }
          : null,
        totalPaidAmount: tenantBalance.totalPaidAmount,
        balances: tenantBalance.tenantBalances.length
          ? tenantBalance.tenantBalances.map((balance) => ({
              id: balance.id,
              amount: balance.amount,
              settlementCurrency: {
                id: balance.settlementCurrency.id,
                name: balance.settlementCurrency.name,
                isoCode: balance.settlementCurrency.isoCode,
                symbol: balance.settlementCurrency.symbol,
              },
            }))
          : null,
      })),
      total: count,
      page: attrs.paginationInput.getPage(),
      size: attrs.paginationInput.getSize(),
    });

    return result.getState();
  }
}
