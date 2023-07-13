import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindPeriodPayoutPaymentsDao } from '~/payouts/application/daos/find-period-payments.dao.contract';
import { FindPeriodPayoutPaymentsQuery } from '~/payouts/application/queries/find-period-payout-payments.query';

export class FindPeriodPayoutPaymentsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_PERIOD_PAYMENTS_QUERY,
      useFactory: (findPeriodPayoutPaymentsDao: IFindPeriodPayoutPaymentsDao) =>
        new FindPeriodPayoutPaymentsQuery(findPeriodPayoutPaymentsDao),
      inject: [PayoutProvidersSymbols.FIND_PERIOD_PAYMENTS_DAO],
    };
  }
}
