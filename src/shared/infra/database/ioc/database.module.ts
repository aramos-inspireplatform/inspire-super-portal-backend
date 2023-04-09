import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers';
import { PaymentMethodsRepository } from '~/shared/infra/database/repositories/payment-methods.repository';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';
import { TenantStatusesRepository } from '~/shared/infra/database/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { VaultsRepository } from '~/shared/infra/database/repositories/vaults.repository';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    VaultsRepository,
    ProcessorsRepository,
    PaymentMethodsRepository,
    TenantsRepository,
    TenantStatusesRepository,
  ],
  exports: [
    ...databaseProviders,
    VaultsRepository,
    ProcessorsRepository,
    PaymentMethodsRepository,
    TenantsRepository,
    TenantStatusesRepository,
  ],
})
export class DatabaseModule {}
