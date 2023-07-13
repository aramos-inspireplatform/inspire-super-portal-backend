import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { FindPeriodPayoutPaymentsDao } from '~/payouts/infra/daos/find-period-payout-payments.dao';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';

export class FindPeriodPayoutPaymentsDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_PERIOD_PAYMENTS_DAO,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindPeriodPayoutPaymentsDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
