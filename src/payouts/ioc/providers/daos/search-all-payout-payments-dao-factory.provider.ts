import { FactoryProvider } from '@nestjs/common';
import { SearchAllPayoutPaymentsDao } from '~/payouts/infra/daos/search-all-payout-payments.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';

export class SearchAllPayoutPaymentsDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.SEARCH_ALL_PAYMENTS_DAO,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new SearchAllPayoutPaymentsDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
