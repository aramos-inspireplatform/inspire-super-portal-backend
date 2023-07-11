import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindAllPayoutPaymentsDao } from '~/payouts/application/daos/find-all-payments.dao.contract';
import { FindAllPayoutPaymentsQuery } from '~/payouts/application/queries/find-all-payout-payments.query';

export class FindAllPayoutPaymentsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_PAYMENTS_QUERY,
      useFactory: (findAllPayoutPaymentsDao: IFindAllPayoutPaymentsDao) =>
        new FindAllPayoutPaymentsQuery(findAllPayoutPaymentsDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_PAYMENTS_DAO],
    };
  }
}
