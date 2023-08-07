import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { FindOnePayoutSummaryPreviewQuery } from '~/payouts/application/queries/find-one-payout-summary-preview.query';
import { IFindOnePayoutSummaryPreviewDao } from '~/payouts/application/daos/find-one-payout-summary-preview.dao.contract';

export class FindOnePayoutSummaryPreviewQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide:
        PayoutProvidersSymbols.Queries.FIND_ONE_PAYOUT_SUMMARY_PREVIEW,
      useFactory: (
        findOnePayoutSummaryPreviewDao: IFindOnePayoutSummaryPreviewDao,
      ) => new FindOnePayoutSummaryPreviewQuery(findOnePayoutSummaryPreviewDao),
      inject: [PayoutProvidersSymbols.Daos.FIND_ONE_PAYOUT_SUMMARY_PREVIEW],
    };
  }
}
