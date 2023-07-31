import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IFindAllPayoutPaymentsPagedDao } from '~/payouts/application/daos/find-all-payout-payments-paged.dao.contract';
import { FindAllPayoutPaymentsPagedQuery } from '~/payouts/application/queries/find-all-payout-payments-paged.query';

export class FindAllPayoutPaymentsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Queries.FIND_ALL_PAYOUT_PAYMENTS_PAGED,
      useFactory: (
        findAllPayoutPaymentsPagedDao: IFindAllPayoutPaymentsPagedDao,
      ) => new FindAllPayoutPaymentsPagedQuery(findAllPayoutPaymentsPagedDao),
      inject: [PayoutProvidersSymbols.Daos.FIND_ALL_PAYOUT_PAYMENTS_PAGED],
    };
  }
}
