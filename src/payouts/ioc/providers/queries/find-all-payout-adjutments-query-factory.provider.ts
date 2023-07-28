import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IFindAllPayoutAdjustmentsDao } from '~/payouts/application/daos/find-all-payout-adjustments.dao.contract';
import { FindAllPayoutAdjustmentsQuery } from '~/payouts/application/queries/find-all-payout-adjustments.query';

export class FindAllPayoutAdjustmentsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Queries.FIND_ALL_PAYOUT_ADJUSTMENTS,
      useFactory: (findAllPayoutAdjustmentsDao: IFindAllPayoutAdjustmentsDao) =>
        new FindAllPayoutAdjustmentsQuery(findAllPayoutAdjustmentsDao),
      inject: [PayoutProvidersSymbols.Daos.FIND_ALL_PAYOUT_ADJUSTMENTS],
    };
  }
}
