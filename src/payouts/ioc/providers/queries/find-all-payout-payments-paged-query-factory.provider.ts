import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindAllPayoutPaymentsPagedDao } from '~/payouts/application/daos/find-all-payout-payments-paged.dao.contract';
import { FindAllPayoutPaymentsPagedQuery } from '~/payouts/application/queries/find-all-payout-payments-paged.query';

export class FindAllPayoutPaymentsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_PAYOUT_PAYMENTS_PAGED_QUERY,
      useFactory: (
        findAllPayoutPaymentsPagedDao: IFindAllPayoutPaymentsPagedDao,
      ) => new FindAllPayoutPaymentsPagedQuery(findAllPayoutPaymentsPagedDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_PAYOUT_PAYMENTS_PAGED_DAO],
    };
  }
}
