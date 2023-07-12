import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers';
import { CountryRepository } from '~/shared/infra/database/repositories/country.repository';
import { ModulesRepository } from '~/requests/infra/repositories/modules.repository';
import { PaymentMethodsRepository } from '~/shared/infra/database/repositories/payment-methods.repository';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';
import { RequestModuleAttemptsStatusRepository } from '~/requests/infra/repositories/request-module-attempts-statuses.repository';
import { RequestModuleAttemptsRepository } from '~/requests/infra/repositories/request-module-attempts.repository';
import { RequestModuleStatusRepository } from '~/requests/infra/repositories/request-modules-status.repository';
import { RequestModulesRepository } from '~/requests/infra/repositories/request-modules.repository';
import { RequestStatusesRepository } from '~/requests/infra/repositories/request-statuses.repository';
import { RequestRepository } from '~/requests/infra/repositories/request.repository';
import { SettlementCurrenciesRepository } from '~/shared/infra/database/repositories/settlement-currencies.repository';
import { TenantStatusesRepository } from '~/tenants/infra/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/tenants/infra/repositories/tenants.repository';
import { VaultsRepository } from '~/shared/infra/database/repositories/vaults.repository';
import { RecurringIntervalsRepository } from '~/tenants/infra/repositories/recurring-intervals.repository';
import { TenantPayoutsRepository } from '~/shared/infra/database/repositories/tenant-payout.repository';

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
    RecurringIntervalsRepository,
    TenantPayoutsRepository,
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
    RecurringIntervalsRepository,
    TenantPayoutsRepository,
  ],
})
export class DatabaseModule {}
