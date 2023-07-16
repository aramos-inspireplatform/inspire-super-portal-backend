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
