import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IFindAllPaymentsPeriodDao } from '~/payouts/application/daos/find-all-payments-period.dao.contract';
import { SearchAllPayoutPaymentsQuery } from '~/payouts/application/queries/find-all-payments-period.query';

export class FindAllPaymentsPeriodQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Queries.FIND_ALL_PAYMENTS_PERIOD,
      useFactory: (searchAllPayoutPaymentsDao: IFindAllPaymentsPeriodDao) =>
        new SearchAllPayoutPaymentsQuery(searchAllPayoutPaymentsDao),
      inject: [PayoutProvidersSymbols.Daos.FIND_ALL_PAYMENTS_PERIOD],
    };
  }
}
