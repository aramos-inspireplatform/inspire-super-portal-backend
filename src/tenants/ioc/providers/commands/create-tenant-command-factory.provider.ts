import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { TenantStatusesRepository } from '~/tenants/infra/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/tenants/infra/repositories/tenants.repository';
import { CreateTenantCommand } from '~/tenants/application/commands';
import { ITenantRepository } from '~/tenants/domain/repositories/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/domain/repositories/tenant-statuses-repository.contract';
import { TenantProviders } from '~/tenants/ioc/tenants-providers.symbols';
import { IRecurringIntervalsRepository } from '~/tenants/domain/repositories/recurring-intervals-repository.contract';
import { RecurringIntervalsRepository } from '~/tenants/infra/repositories/recurring-intervals.repository';

export class CreateTenantCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProviders.Commands.CREATE_TENANT_COMMAND,
      useFactory: (
        inspireTenantService: IInspireTenantApiService,
        tenantRepository: ITenantRepository,
        tenantStatusesRepository: ITenantStatusesRepository,
        recurringIntervalsRepository: IRecurringIntervalsRepository,
      ) =>
        new CreateTenantCommand(
          inspireTenantService,
          tenantRepository,
          tenantStatusesRepository,
          recurringIntervalsRepository,
        ),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        TenantsRepository,
        TenantStatusesRepository,
        RecurringIntervalsRepository,
      ],
    };
  }
}
