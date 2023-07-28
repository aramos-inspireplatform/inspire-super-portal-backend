import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { FindAllReconcilePeriodDao } from '~/payouts/infra/daos/find-all-reconcile-period.dao';

export class FindAllReconcilePeriodDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ALL_RECONCILE_PERIOD,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindAllReconcilePeriodDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
