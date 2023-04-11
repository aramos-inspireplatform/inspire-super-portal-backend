import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers';
import { CountryRepository } from '~/shared/infra/database/repositories/country.repository';
import { ModuleRequestStatusesRepository } from '~/shared/infra/database/repositories/module-request-statuses.repository';
import { ModuleRequestTypesRepository } from '~/shared/infra/database/repositories/module-request-types.repository';
import { ModuleRequestRepository } from '~/shared/infra/database/repositories/module-request.repository';
import { PaymentMethodsRepository } from '~/shared/infra/database/repositories/payment-methods.repository';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';
import { SettlementCurrenciesRepository } from '~/shared/infra/database/repositories/settlement-currencies.repository';
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
    ModuleRequestStatusesRepository,
    ModuleRequestTypesRepository,
    ModuleRequestRepository,
    SettlementCurrenciesRepository,
    CountryRepository,
  ],
  exports: [
    ...databaseProviders,
    VaultsRepository,
    ProcessorsRepository,
    PaymentMethodsRepository,
    TenantsRepository,
    TenantStatusesRepository,
    ModuleRequestStatusesRepository,
    ModuleRequestTypesRepository,
    ModuleRequestRepository,
    SettlementCurrenciesRepository,
    CountryRepository,
  ],
})
export class DatabaseModule {}
