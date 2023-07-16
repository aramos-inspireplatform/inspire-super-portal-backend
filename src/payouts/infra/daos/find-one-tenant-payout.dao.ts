import { DataSource, Repository } from 'typeorm';
import { IFindOneTenantPayoutDao } from '~/payouts/application/daos/find-one-tenant-payout.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { TenantPayouts } from '~/shared/infra/database/entities';

export class FindOneTenantPayoutDao implements IFindOneTenantPayoutDao {
  private payoutRepository: Repository<TenantPayouts>;

  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
    private readonly dataSource: DataSource,
  ) {
    this.payoutRepository = this.dataSource.getRepository(TenantPayouts);
  }

  async execute(
    attrs: IFindOneTenantPayoutDao.Input,
  ): IFindOneTenantPayoutDao.Output {
    const payout = await this.inspirePaymentApiService.findOnePayout({
      ...attrs,
    });

    return payout
      ? {
          id: payout.id,
          status: payout.status
            ? {
                id: payout.status.id,
                name: payout.status.name,
                slug: payout.status.slug,
              }
            : null,
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
          processedDate: payout.processedDate,
          expectedArrivalDate: payout.expectedArrivalDate,
          paidDate: payout.paidDate,
          terms: payout.terms
            ? {
                recurringIntervalCount: payout.terms.recurringIntervalCount,
                recurringInterval: payout.terms.recurringInterval
                  ? {
                      id: payout.terms.recurringInterval.id,
                      name: payout.terms.recurringInterval.name,
                      interval: payout.terms.recurringInterval.interval,
                    }
                  : null,
              }
            : null,
        }
      : null;
  }
}
