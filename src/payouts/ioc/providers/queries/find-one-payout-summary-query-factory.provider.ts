import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IFindOnePayoutSummaryDao } from '~/payouts/application/daos/find-one-payout-summary.dao.contract';
import { FindOnePayoutSummaryQuery } from '~/payouts/application/queries/find-one-payout-summary.query';

export class FindOnePayoutSummaryQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_QUERY,
      useFactory: (findOnePayoutSummaryDao: IFindOnePayoutSummaryDao) =>
        new FindOnePayoutSummaryQuery(findOnePayoutSummaryDao),
      inject: [PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_DAO],
    };
  }
}
