import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindOnePayoutSummaryPreviewQuery } from '~/payouts/application/queries/find-one-payout-summary-preview.query';
import { IFindOnePayoutSummaryPreviewDao } from '~/payouts/application/daos/find-one-payout-summary-preview.dao.contract';

export class FindOnePayoutSummaryPreviewQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_PREVIEW_QUERY,
      useFactory: (
        findOnePayoutSummaryPreviewDao: IFindOnePayoutSummaryPreviewDao,
      ) => new FindOnePayoutSummaryPreviewQuery(findOnePayoutSummaryPreviewDao),
      inject: [PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_PREVIEW_DAO],
    };
  }
}
