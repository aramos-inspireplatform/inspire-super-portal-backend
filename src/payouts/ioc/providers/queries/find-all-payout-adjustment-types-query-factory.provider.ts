import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPayoutAdjustmentTypesQuery } from '~/payouts/application/queries/find-all-payout-adjustment-types.query';
import { IFindAllPayoutAdjustmentTypesDao } from '~/payouts/application/daos/find-all-payout-adjustment-types.dao.contract';

export class FindAllPayoutAdjustmentTypesQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_PAYOUT_ADJUSTMENT_TYPES_QUERY,
      useFactory: (
        findAllPayoutAdjustmentTypesDao: IFindAllPayoutAdjustmentTypesDao,
      ) =>
        new FindAllPayoutAdjustmentTypesQuery(findAllPayoutAdjustmentTypesDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_PAYOUT_ADJUSTMENT_TYPES_DAO],
    };
  }
}
