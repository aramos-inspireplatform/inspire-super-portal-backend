import { DataSource, Repository } from 'typeorm';
import { IFindAllTenantPayoutsPagedDao } from '~/payouts/application/daos/find-all-tenant-payouts-paged.dao.contract';
import { PaginationOutput } from '~/shared/application/services/pagination';
import { TenantPayouts } from '~/shared/infra/database/entities';

export class FindAllTenantPayoutsPagedDao
  implements IFindAllTenantPayoutsPagedDao
{
  private tenantPayoutRepository: Repository<TenantPayouts>;

  constructor(private readonly dataSource: DataSource) {
    this.tenantPayoutRepository = this.dataSource.getRepository(TenantPayouts);
  }
  async execute(
    attrs: IFindAllTenantPayoutsPagedDao.Input,
  ): Promise<IFindAllTenantPayoutsPagedDao.Output> {
    const query = this.tenantPayoutRepository
      .createQueryBuilder('tenantPayouts')
      .select([
        'tenant.id',
        'tenant.name',
        'tenant.googleTenantId',
        'tenant.agencyId',
        'tenant.agencyName',
        'tenantPayouts.id',
        'tenantPayouts.payoutAlternativeId',
        'processorUser.id',
        'processorUser.firstName',
        'processorUser.lastName',
        'payoutStatus.id',
        'payoutStatus.name',
        'payoutStatus.slug',
        'tenantPayouts.amount',
        'settlementCurrency.id',
        'settlementCurrency.name',
        'settlementCurrency.isoCode',
        'settlementCurrency.symbol',
        'tenantPayouts.createdDate',
        'tenantPayouts.processedDate',
        'tenantPayouts.paidDate',
        'tenantPayouts.expectedArrivalDate',
        'tenantPayouts.termsRecurringIntervalCount',
        'termsRecurringInterval.id',
        'termsRecurringInterval.name',
        'termsRecurringInterval.interval',
      ])
      .innerJoin('tenantPayouts.tenant', 'tenant')
      .innerJoin('tenantPayouts.payoutStatus', 'payoutStatus')
      .innerJoin('tenantPayouts.settlementCurrency', 'settlementCurrency')
      .innerJoin(
        'tenantPayouts.termsRecurringInterval',
        'termsRecurringInterval',
      )
      .leftJoin('tenantPayouts.processorUser', 'processorUser')
      .orderBy('tenantPayouts.processedDate', 'DESC');

    if (attrs.authUser.isAgencyAdmin()) {
      if (!attrs.authUser.agencies?.length) return null;

      query.where('tenant.agencyId in (:...agenciesIds)', {
        agenciesIds: attrs.authUser.agencies.map((agency) => agency.id),
      });
    }

    const [payouts, count] = await query
      .skip(attrs.paginationInput.skip())
      .take(attrs.paginationInput.take())
      .getManyAndCount();

    const result = new PaginationOutput({
      rows: payouts?.map((payout) => ({
        id: payout.id,
        alternativeId: payout.payoutAlternativeId,
        tenant: payout.tenant
          ? {
              id: payout.tenant.id,
              name: payout.tenant.name,
              gTenantId: payout.tenant.googleTenantId,
              agency: payout.tenant.agencyId
                ? {
                    id: payout.tenant.agencyId,
                    name: payout.tenant.agencyName,
                  }
                : null,
            }
          : null,
        processorUser: payout.processorUser
          ? {
              id: payout.processorUser.id,
              firstName: payout.processorUser.firstName,
              lastName: payout.processorUser.lastName,
            }
          : null,
        status: payout.payoutStatus
          ? {
              id: payout.payoutStatus.id,
              name: payout.payoutStatus.name,
              slug: payout.payoutStatus.slug,
            }
          : null,
        amount: Number(payout.amount.toPrecision(6)),
        settlementCurrency: payout.settlementCurrency
          ? {
              id: payout.settlementCurrency.id,
              name: payout.settlementCurrency.name,
              isoCode: payout.settlementCurrency.isoCode,
              symbol: payout.settlementCurrency.symbol,
            }
          : null,
        createdDate: payout.createdDate,
        processedDate: payout.processedDate ?? null,
        paidDate: payout.paidDate ?? null,
        expectedArrivalDate: payout.expectedArrivalDate ?? null,
        terms: payout.termsRecurringInterval
          ? {
              recurringIntervalCount: payout.termsRecurringIntervalCount,
              recurringInterval: {
                id: payout.termsRecurringInterval.id,
                name: payout.termsRecurringInterval.name,
                interval: payout.termsRecurringInterval.interval,
              },
            }
          : null,
      })),
      total: count,
      page: attrs.paginationInput.getPage(),
      size: attrs.paginationInput.getSize(),
    });

    return result.getState();
  }
}
