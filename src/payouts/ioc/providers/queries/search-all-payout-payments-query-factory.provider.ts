import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { ISearchAllPayoutPaymentsDao } from '~/payouts/application/daos/search-all-payments.dao.contract';
import { SearchAllPayoutPaymentsQuery } from '~/payouts/application/queries/search-all-payout-payments.query';

export class SearchAllPayoutPaymentsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.SEARCH_ALL_PAYMENTS_QUERY,
      useFactory: (findAllPayoutPaymentsDao: ISearchAllPayoutPaymentsDao) =>
        new SearchAllPayoutPaymentsQuery(findAllPayoutPaymentsDao),
      inject: [PayoutProvidersSymbols.SEARCH_ALL_PAYMENTS_DAO],
    };
  }
}
