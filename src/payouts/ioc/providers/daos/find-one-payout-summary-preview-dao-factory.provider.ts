import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { FindOnePayoutSummaryPreviewDao } from '~/payouts/infra/daos/find-one-payout-summary-preview.dao';

export class FindOnePayoutSummaryPreviewDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ONE_PAYOUT_SUMMARY_PREVIEW,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindOnePayoutSummaryPreviewDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
