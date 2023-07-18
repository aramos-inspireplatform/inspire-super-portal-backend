import { FactoryProvider } from '@nestjs/common';
import { CreatePayoutBexsDao } from '~/payouts/infra/daos/create-payout-bexs.dao';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';

export class CreatePayoutBexsDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.CREATE_PAYOUT_BEXS_DAO,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new CreatePayoutBexsDao(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
