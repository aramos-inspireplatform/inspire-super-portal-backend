import { DataSource, Repository } from 'typeorm';
import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { Tenants } from '~/shared/infra/database/entities';

export class FindOneTenantBalanceDao implements IFindOneTenantBalanceDao {
  private tenantRepository: Repository<Tenants>;

  constructor(private readonly dataSource: DataSource) {
    this.tenantRepository = this.dataSource.getRepository(Tenants);
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
      .leftJoin('tenants.lastTenantPayout', 'lastTenantPayout')
      .leftJoin('lastTenantPayout.payoutStatus', 'lastTenantPayoutStatus')
      .leftJoin(
        'lastTenantPayout.settlementCurrency',
        'lastTenantPayoutSettlementCurrency',
      )
      .leftJoin(
        'tenants.tenantBalances',
        'tenantBalances',
        'tenantBalances.settlementCurrency.id = :settlementCurrencyId',
        { settlementCurrencyId: attrs.settlementCurrencyId },
      )
      .leftJoin(
        'tenantBalances.settlementCurrency',
        'tenantBalanceSettlementCurrency',
      )
      .where('tenants.googleTenantId = :gTenantId', {
        gTenantId: attrs.gTenantId,
      });

    if (attrs.authUser.isAgencyAdmin()) {
      if (!attrs.authUser.agencies?.length) return null;

      query.andWhere('tenants.agencyId in (:...agenciesIds)', {
        agenciesIds: attrs.authUser.agencies.map((agency) => agency.id),
      });
    }

    const tenantBalance = await query.getOne();

    return tenantBalance
      ? {
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
          balance: tenantBalance.tenantBalances.length
            ? {
                id: tenantBalance.tenantBalances[0].id,
                amount: tenantBalance.tenantBalances[0].amount,
                settlementCurrency: {
                  id: tenantBalance.tenantBalances[0].settlementCurrency.id,
                  name: tenantBalance.tenantBalances[0].settlementCurrency.name,
                  isoCode:
                    tenantBalance.tenantBalances[0].settlementCurrency.isoCode,
                  symbol:
                    tenantBalance.tenantBalances[0].settlementCurrency.symbol,
                },
              }
            : null,
        }
      : null;
  }
}
