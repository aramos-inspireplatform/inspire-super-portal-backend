import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { TenantStatusesRepository } from '~/shared/infra/database/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { CreateTenantV2UseCase } from '~/tenants/application/use-case/create-tenant-v2.use-case';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repository/tenant-statuses-repository.contract';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';

export class CreateTenantV2UseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.CREATE_TENANT_V2_USE_CASE,
      useFactory: (
        inspireTenantService: IInspireTenantApiService,
        tenantRepository: ITenantRepository,
        tenantStatusesRepository: ITenantStatusesRepository,
      ) =>
        new CreateTenantV2UseCase(
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
