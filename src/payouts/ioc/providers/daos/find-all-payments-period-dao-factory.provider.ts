import { FactoryProvider } from '@nestjs/common';
import { FindAllPaymentsPeriodDao } from '~/payouts/infra/daos/find-all-payments-period.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';

export class FindAllPaymentsPeriodDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ALL_PAYMENTS_PERIOD,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindAllPaymentsPeriodDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
