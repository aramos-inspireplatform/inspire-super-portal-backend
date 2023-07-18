import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { FindAllPayoutAdjustmentTypesDao } from '~/payouts/infra/daos/find-all-payout-adjustment-types.dao';

export class FindAllPayoutAdjustmentTypesDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_PAYOUT_ADJUSTMENT_TYPES_DAO,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new FindAllPayoutAdjustmentTypesDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
