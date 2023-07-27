import { FactoryProvider } from '@nestjs/common';
import { FindAllPaymentsPeriodPagedDao } from '~/payouts/infra/daos/find-all-payments-period-paged.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';

export class FindAllPaymentsPeriodPagedDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ALL_PAYMENTS_PERIOD_PAGED,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindAllPaymentsPeriodPagedDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
