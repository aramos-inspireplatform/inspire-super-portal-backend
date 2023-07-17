import { NotFoundException } from '@nestjs/common';
import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { IFindOneTenantPayoutDao } from '~/payouts/application/daos/find-one-tenant-payout.dao.contract';
import { IFindOneTenantPayoutQuery } from '~/payouts/application/queries/contracts/find-one-tenant-payout.query.contract';
import { PayoutsExceptionsConstants } from '~/payouts/domain/exceptions/payouts-exceptions.enum';

export class FindOneTenantPayoutQuery implements IFindOneTenantPayoutQuery {
  constructor(
    private readonly findOneTenantPayoutDao: IFindOneTenantPayoutDao,
    private readonly findOneTenantBalanceDao: IFindOneTenantBalanceDao,
  ) {}

  async execute(
    attrs: IFindOneTenantPayoutQuery.Input,
  ): IFindOneTenantPayoutQuery.Output {
    const payout = await this.findOneTenantPayoutDao.execute({
      ...attrs,
    });
    if (!payout)
      throw new NotFoundException(PayoutsExceptionsConstants.PAYOUT_NOT_FOUND);

    const tenantBalance = await this.findOneTenantBalanceDao.execute({
      authUser: attrs.authUser,
      gTenantId: attrs.gTenantId,
      settlementCurrencyId: payout.settlementCurrency.id,
    });
    if (!tenantBalance)
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
      paidDate: payout.paidDate,
      expectedArrivalDate: payout.expectedArrivalDate,
      tenant: tenantBalance
        ? {
            id: tenantBalance.id,
            gTenantId: tenantBalance.gTenantId,
            name: tenantBalance.name,
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
