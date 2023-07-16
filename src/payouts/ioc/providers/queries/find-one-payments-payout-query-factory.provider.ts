import { FactoryProvider } from '@nestjs/common';
import { IFindOnePaymentsPayoutDao } from '~/payouts/application/daos/find-one-payments-payout.dao.contract';
import { FindOnePaymentsPayoutQuery } from '~/payouts/application/queries/find-one-payments-payout.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';

export class FindOnePaymentsPayoutQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_QUERY,
      useFactory: (findOnePaymentsPayoutDao: IFindOnePaymentsPayoutDao) =>
        new FindOnePaymentsPayoutQuery(findOnePaymentsPayoutDao),
      inject: [PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_DAO],
    };
  }
}
