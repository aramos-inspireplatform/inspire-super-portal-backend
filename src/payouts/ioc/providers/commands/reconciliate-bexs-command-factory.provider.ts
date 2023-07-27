import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { ReconciliateBexsCommand } from '~/payouts/application/commands/reconciliate-bexs.command';

export class ReconciliateBexsCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Commands.RECONCILIATE_BEXS,
      useFactory: (inspirePaymentApiService: IInspirePaymentApiService) =>
        new ReconciliateBexsCommand(inspirePaymentApiService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
