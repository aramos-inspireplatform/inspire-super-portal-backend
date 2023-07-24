import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindAllReconcilePeriodDao } from '~/payouts/application/daos/find-all-reconcile-period.dao.contract';
import { FindAllReconcilePeriodQuery } from '~/payouts/application/queries/find-all-reconcile-period.query';

export class FindAllReconcilePeriodQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_RECONCILE_PERIOD_QUERY,
      useFactory: (findAllReconcilePeriodDao: IFindAllReconcilePeriodDao) =>
        new FindAllReconcilePeriodQuery(findAllReconcilePeriodDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_RECONLICE_PERIOD_DAO],
    };
  }
}
