import { FactoryProvider } from '@nestjs/common';
import { FindAllPayoutAdjustmentsDao } from '~/payouts/infra/daos/find-all-payout-adjustments.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';

export class FindAllPayoutAdjustmentsDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Daos.FIND_ALL_PAYOUT_ADJUSTMENTS,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindAllPayoutAdjustmentsDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
