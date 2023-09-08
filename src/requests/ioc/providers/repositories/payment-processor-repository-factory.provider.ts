import { FactoryProvider } from '@nestjs/common';
import { RequestProvider } from '~/requests/ioc/requests-providers.symbols';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { PaymentProcessorRepositoryTypeOrmAdapter } from '~/requests/infra/repositories';

export class PaymentProcessorRepositoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProvider.Repositories.PAYMENT_PROCESSOR,
      useFactory: (connection: any) =>
        new PaymentProcessorRepositoryTypeOrmAdapter(connection),
      inject: [DatabaseProvidersSymbols.DATA_SOURCE],
    };
  }
}
