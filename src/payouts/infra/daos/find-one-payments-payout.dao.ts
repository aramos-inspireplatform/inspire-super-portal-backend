import { DataSource, Repository } from 'typeorm';
import { IFindOnePaymentsPayoutDao } from '~/payouts/application/daos/find-one-payments-payout.dao.contract';
import { TenantPayouts } from '~/shared/infra/database/entities';

export class FindOnePaymentsPayoutDao implements IFindOnePaymentsPayoutDao {
  private payoutRepository: Repository<TenantPayouts>;

  constructor(private readonly dataSource: DataSource) {
    this.payoutRepository = this.dataSource.getRepository(TenantPayouts);
  }

  async execute(
    attrs: IFindOnePaymentsPayoutDao.Input,
  ): IFindOnePaymentsPayoutDao.Output {
    const query = this.payoutRepository
      .createQueryBuilder('payouts')
      .select([
        // 'payouts',
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
        // 'tenants',
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
