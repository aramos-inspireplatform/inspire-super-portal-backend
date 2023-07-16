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
        'payoutStatus.name',
        'payoutStatus.createdDate',
        'payouts.id',
        'payouts.processedDate',
        'payouts.amount',
        'payouts.created_date',
        'payouts.periodStartDate',
        'payouts.periodEndDate',
        'payouts.customerGrossAmount',
        'payouts.customerFeeAmount',
        'tenants.id',
        'tenants.name',
        'tenants.googleTenantId',
        'payouts.termsRecurringIntervalCount',
        'tenants.totalPaidAmount',
        'termsRecurringIntervals.id',
        'termsRecurringIntervals.name',
        'termsRecurringIntervals.interval',
      ])
      .innerJoin('payouts.tenantsId', 'tenants')
      .innerJoin('payouts.payoutStatus', 'payoutStatus')
      .innerJoin('tenants.tenantStatus', 'tenantStatus')
      .innerJoin('payouts.termsRecurringIntervals', 'termsRecurringIntervals')
      .where('payouts.id = :payoutId', { payoutId: attrs.payoutId });

    if (attrs.authUser.isAgencyAdmin()) {
      if (!attrs.authUser.agencies?.length) return null;
    }

    const payout = await query.getOne();

    return {
      id: payout?.id,
      statusPayout: payout?.payoutStatus?.name,
      createdDate: payout?.payoutStatus?.createdDate,
      tenant: {
        gTenantId: payout?.tenantsId?.googleTenantId,
        name: payout?.tenantsId?.name,
      },
      periodStartDate: payout?.periodEndDate,
      periodEndDate: payout?.periodStartDate,
      amount: payout?.amount,
      payoutTermsCount: payout?.termsRecurringIntervalCount,
      payoutTermsInterval: payout?.termsRecurringIntervals?.interval,
    };
  }
}
