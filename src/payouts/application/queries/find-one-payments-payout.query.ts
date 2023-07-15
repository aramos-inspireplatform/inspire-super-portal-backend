import { NotFoundException } from '@nestjs/common';
import { IFindOnePaymentsPayoutDao } from '~/payouts/application/daos/find-one-payments-payout.dao.contract';
import { IFindOnePaymentsPayoutQuery } from '~/payouts/application/queries/contracts/find-one-payments-payout.query.contract';
import { PayoutsExceptionsConstants } from '~/payouts/domain/exceptions/payouts-exceptions.enum';

export class FindOnePaymentsPayoutQuery implements IFindOnePaymentsPayoutQuery {
  constructor(
    private readonly findOneTenantBalanceDao: IFindOnePaymentsPayoutDao,
  ) {}

  async execute(
    attrs: IFindOnePaymentsPayoutQuery.Input,
  ): IFindOnePaymentsPayoutQuery.Output {
    const payout = await this.findOneTenantBalanceDao.execute({
      authUser: attrs.authUser,
      payoutId: attrs.payoutId,
    });
    if (!payout)
      throw new NotFoundException(PayoutsExceptionsConstants.PAYOUT_NOT_FOUND);

    return {
      id: payout.id,
      statusPayout: payout?.statusPayout,
      tenant: {
        gTenantId: payout.tenant.gTenantId,
        name: payout.tenant.name,
      },
      periodStartDate: payout.periodStartDate,
      periodEndDate: payout.periodEndDate,
      amount: payout.amount,
      createdDate: payout.createdDate,
      payoutTermsCount: payout.payoutTermsCount,
      payoutTermsInterval: payout.payoutTermsInterval,
    };
  }
}
