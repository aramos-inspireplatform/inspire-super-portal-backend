import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindAllPaymentsPeriodPagedDao } from '~/payouts/application/daos/find-all-payments-period-paged.dao.contract';
import { FindAllPaymentsPeriodPagedQuery } from '~/payouts/application/queries/find-all-payments-period-paged.query';

export class FindAllPaymentsPeriodPagedQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_PAYMENTS_PERIOD_PAGED_QUERY,
      useFactory: (
        findAllPaymentsPeriodPagedDao: IFindAllPaymentsPeriodPagedDao,
      ) => new FindAllPaymentsPeriodPagedQuery(findAllPaymentsPeriodPagedDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_PAYMENTS_PERIOD_PAGED_DAO],
    };
  }
}
