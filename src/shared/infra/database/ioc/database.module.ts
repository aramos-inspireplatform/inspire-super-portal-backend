import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers';
import { CountryRepository } from '~/shared/infra/database/repositories/country.repository';
import { ModulesRepository } from '~/shared/infra/database/repositories/modules.repository';
import { PaymentMethodsRepository } from '~/shared/infra/database/repositories/payment-methods.repository';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';
import { RequestModuleAttemptsStatusRepository } from '~/shared/infra/database/repositories/request-module-attempts-statuses.repository';
import { RequestModuleAttemptsRepository } from '~/shared/infra/database/repositories/request-module-attempts.repository';
import { RequestModuleStatusRepository } from '~/shared/infra/database/repositories/request-modules-status.repository';
import { RequestModulesRepository } from '~/shared/infra/database/repositories/request-modules.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
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
    ModulesRepository,
    SettlementCurrenciesRepository,
    CountryRepository,
    RequestStatusesRepository,
    RequestRepository,
    RequestModuleAttemptsStatusRepository,
    RequestModuleAttemptsRepository,
    RequestModuleStatusRepository,
    RequestModulesRepository,
  ],
  exports: [
    ...databaseProviders,
    VaultsRepository,
    ProcessorsRepository,
    PaymentMethodsRepository,
    TenantsRepository,
    TenantStatusesRepository,
    ModulesRepository,
    SettlementCurrenciesRepository,
    CountryRepository,
    RequestStatusesRepository,
    RequestRepository,
    RequestModuleAttemptsStatusRepository,
    RequestModuleAttemptsRepository,
    RequestModuleStatusRepository,
    RequestModulesRepository,
  ],
})
export class DatabaseModule {}
