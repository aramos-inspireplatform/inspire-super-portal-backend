import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IFindAllReconcilePeriodDao } from '~/payouts/application/daos/find-all-reconcile-period.dao.contract';
import { FindAllReconcilePeriodQuery } from '~/payouts/application/queries/find-all-reconcile-period.query';

export class FindAllReconcilePeriodQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Queries.FIND_ALL_RECONCILE_PERIOD,
      useFactory: (findAllReconcilePeriodDao: IFindAllReconcilePeriodDao) =>
        new FindAllReconcilePeriodQuery(findAllReconcilePeriodDao),
      inject: [PayoutProvidersSymbols.Daos.FIND_ALL_RECONCILE_PERIOD],
    };
  }
}
