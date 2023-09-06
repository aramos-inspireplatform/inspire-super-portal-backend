import { FactoryProvider } from '@nestjs/common';
import { TransactionProvidersSymbols } from '~/transactions/ioc/transactions-providers.symbols';
import { ManualReconciledCommand } from '~/transactions/application/commands';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class ManualReconciledCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TransactionProvidersSymbols.MANUAL_RECONCILED_COMMAND,
      useFactory: (apiPaymentService: IInspirePaymentApiService) =>
        new ManualReconciledCommand(apiPaymentService),
      inject: [InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE],
    };
  }
}
