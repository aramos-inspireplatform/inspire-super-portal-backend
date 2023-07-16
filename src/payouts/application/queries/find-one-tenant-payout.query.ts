import { NotFoundException } from '@nestjs/common';
import { IFindOneTenantPayoutDao } from '~/payouts/application/daos/find-one-tenant-payout.dao.contract';
import { IFindOneTenantPayoutQuery } from '~/payouts/application/queries/contracts/find-one-tenant-payout.query.contract';
import { PayoutsExceptionsConstants } from '~/payouts/domain/exceptions/payouts-exceptions.enum';

export class FindOneTenantPayoutQuery implements IFindOneTenantPayoutQuery {
  constructor(
    private readonly findOneTenantPayoutDao: IFindOneTenantPayoutDao,
  ) {}

  async execute(
    attrs: IFindOneTenantPayoutQuery.Input,
  ): IFindOneTenantPayoutQuery.Output {
    const payout = await this.findOneTenantPayoutDao.execute({
      authUser: attrs.authUser,
      payoutId: attrs.payoutId,
    });
    if (!payout)
      throw new NotFoundException(PayoutsExceptionsConstants.PAYOUT_NOT_FOUND);

    return {
      id: payout.id,
      status: payout.status
        ? {
            id: payout.status.id,
            name: payout.status.name,
            slug: payout.status.slug,
          }
        : null,
      amount: payout.amount,
      settlementCurrency: payout.settlementCurrency
        ? {
            id: payout.settlementCurrency.id,
            name: payout.settlementCurrency.name,
            isoCode: payout.settlementCurrency.isoCode,
            symbol: payout.settlementCurrency.symbol,
          }
        : null,
      periodStartDate: payout.periodStartDate,
      periodEndDate: payout.periodEndDate,
      createdDate: payout.createdDate,
      processedDate: payout.processedDate,
      expectedArrivalDate: payout.expectedArrivalDate,
      paidDate: payout.paidDate,
      tenant: payout.tenant
        ? {
            id: payout.tenant.id,
            gTenantId: payout.tenant.gTenantId,
            name: payout.tenant.name,
          }
        : null,
      terms: {
        recurringIntervalCount: payout.terms.recurringIntervalCount,
        recurringInterval: payout.terms.recurringInterval
          ? {
              id: payout.terms.recurringInterval.id,
              name: payout.terms.recurringInterval.name,
              interval: payout.terms.recurringInterval.interval,
            }
          : null,
      },
    };
  }
}
