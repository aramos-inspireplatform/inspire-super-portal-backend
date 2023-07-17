import { FactoryProvider } from '@nestjs/common';
import { SearchAllPayoutPaymentsDao } from '~/payouts/infra/daos/search-all-payout-payments.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { FindOnePayoutSummaryDao } from '~/payouts/infra/daos/find-one-payout-summary.dao';

<<<<<<< HEAD:src/payouts/ioc/providers/daos/search-all-payout-payments-dao-factory.provider.ts
export class SearchAllPayoutPaymentsDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.SEARCH_ALL_PAYMENTS_DAO,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new SearchAllPayoutPaymentsDao(inspirePaymentApiService),
=======
export class FindOnePayoutSummaryDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_DAO,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindOnePayoutSummaryDao(inspirePaymentApiService),
>>>>>>> develop-softo-create-payout:src/payouts/ioc/providers/daos/find-one-payout-summary-dao-factory.provider.ts
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
