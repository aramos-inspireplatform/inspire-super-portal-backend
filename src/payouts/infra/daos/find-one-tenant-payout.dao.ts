import { DataSource, Repository } from 'typeorm';
import { IFindOneTenantPayoutDao } from '~/payouts/application/daos/find-one-tenant-payout.dao.contract';
import { TenantPayouts } from '~/shared/infra/database/entities';

export class FindOneTenantPayoutDao implements IFindOneTenantPayoutDao {
  private payoutRepository: Repository<TenantPayouts>;

  constructor(private readonly dataSource: DataSource) {
    this.payoutRepository = this.dataSource.getRepository(TenantPayouts);
  }

  async execute(
    attrs: IFindOneTenantPayoutDao.Input,
  ): IFindOneTenantPayoutDao.Output {
    const query = this.payoutRepository
      .createQueryBuilder('payouts')
      .select([
        'payouts.id',
        'payouts.processedDate',
        'payouts.amount',
        'payouts.createdDate',
        'payouts.periodStartDate',
        'payouts.periodEndDate',
        'payouts.processedDate',
        'payouts.customerGrossAmount',
        'payouts.customerFeeAmount',
        'payoutStatus.id',
        'payoutStatus.name',
        'payoutStatus.slug',
        'settlementCurrency.id',
        'settlementCurrency.name',
        'settlementCurrency.isoCode',
        'settlementCurrency.symbol',
        'tenant.id',
        'tenant.name',
        'tenant.googleTenantId',
        'payouts.termsRecurringIntervalCount',
        'tenant.totalPaidAmount',
        'termsRecurringIntervals.id',
        'termsRecurringIntervals.name',
        'termsRecurringIntervals.interval',
      ])
      .innerJoin('payouts.tenant', 'tenant')
      .innerJoin('payouts.payoutStatus', 'payoutStatus')
      .innerJoin('payouts.settlementCurrency', 'settlementCurrency')
      .innerJoin('tenant.tenantStatus', 'tenantStatus')
      .innerJoin('payouts.termsRecurringIntervals', 'termsRecurringIntervals')
      .where('payouts.id = :payoutId', { payoutId: attrs.payoutId });

    if (attrs.authUser.isAgencyAdmin()) {
      if (!attrs.authUser.agencies?.length) return null;

      query.andWhere('tenant.agencyId in (:...agenciesIds)', {
        agenciesIds: attrs.authUser.agencies.map((agency) => agency.id),
      });
    }

    const payout = await query.getOne();

    return payout
      ? {
          id: payout.id,
          status: {
            id: payout.payoutStatus.id,
            name: payout.payoutStatus.name,
            slug: payout.payoutStatus.slug,
          },
          amount: Number(Number(payout.amount).toPrecision(6)),
          settlementCurrency: payout.settlementCurrency
            ? {
                id: payout.settlementCurrency.id,
                name: payout.settlementCurrency.name,
                isoCode: payout.settlementCurrency.isoCode,
                symbol: payout.settlementCurrency.symbol,
              }
            : null,
          periodStartDate: payout.periodEndDate,
          periodEndDate: payout.periodStartDate,
          createdDate: payout.createdDate,
          processedDate: payout.processedDate ?? null,
          expectedArrivalDate: payout.expectedArrivalDate ?? null,
          paidDate: 'MISSING IN DB',
          tenant: {
            id: payout.tenant.id,
            gTenantId: payout.tenant.googleTenantId,
            name: payout.tenant.name,
          },
          terms: {
            recurringIntervalCount: payout.termsRecurringIntervalCount,
            recurringInterval: {
              id: payout.termsRecurringIntervals?.id,
              name: payout.termsRecurringIntervals?.name,
              interval: payout.termsRecurringIntervals?.interval,
            },
          },
        }
      : null;
  }
}
