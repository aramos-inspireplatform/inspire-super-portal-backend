import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { TenantStatusesRepository } from '~/shared/infra/database/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { CreateTenantCommand } from '~/tenants/application/commands/create-tenant.command';
import { ITenantRepository } from '~/tenants/infra/contracts/repositories/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repositories/tenant-statuses-repository.contract';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';

export class CreateTenantCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.CREATE_TENANT_COMMAND,
      useFactory: (
        inspireTenantService: IInspireTenantApiService,
        tenantRepository: ITenantRepository,
        tenantStatusesRepository: ITenantStatusesRepository,
      ) =>
        new CreateTenantCommand(
          inspireTenantService,
          tenantRepository,
          tenantStatusesRepository,
        ),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        TenantsRepository,
        TenantStatusesRepository,
      ],
    };
  }
}
