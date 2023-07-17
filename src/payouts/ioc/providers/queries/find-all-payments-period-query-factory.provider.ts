import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindAllPaymentsPeriodDao } from '~/payouts/application/daos/find-all-payments-period.dao.contract';
import { SearchAllPayoutPaymentsQuery } from '~/payouts/application/queries/find-all-payments-period.query';

export class FindAllPaymentsPeriodQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_PAYMENTS_PERIOD_QUERY,
      useFactory: (searchAllPayoutPaymentsDao: IFindAllPaymentsPeriodDao) =>
        new SearchAllPayoutPaymentsQuery(searchAllPayoutPaymentsDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_PAYMENTS_PERIOD_DAO],
    };
  }
}
