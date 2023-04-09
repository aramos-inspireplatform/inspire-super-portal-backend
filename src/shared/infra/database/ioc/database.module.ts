import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers';
import { PaymentMethodsRepository } from '~/shared/infra/database/repositories/payment-methods.repository';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';
import { VaultsRepository } from '~/shared/infra/database/repositories/vaults.repository';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    VaultsRepository,
    ProcessorsRepository,
    PaymentMethodsRepository,
  ],
  exports: [
    ...databaseProviders,
    VaultsRepository,
    ProcessorsRepository,
    PaymentMethodsRepository,
  ],
})
export class DatabaseModule {}
