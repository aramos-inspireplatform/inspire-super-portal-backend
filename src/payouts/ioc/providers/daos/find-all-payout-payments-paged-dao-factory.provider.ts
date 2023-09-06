import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { FindAllPayoutPaymentsPagedDao } from '~/payouts/infra/daos/find-all-payout-payments-paged.dao';

export class FindAllPayoutPaymentsPagedDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ALL_PAYOUT_PAYMENTS_PAGED,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindAllPayoutPaymentsPagedDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
