import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { FindAllTenantV2UseCase } from '~/tenants/application/use-case/find-all-tenant-v2.use-case';

export class FindAllTenantV2UseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.FIND_ALL_TENANT_V2_USE_CASE,
      useFactory: (
        inspireTenantService: IInspireTenantApiService,
        tenantRepository: ITenantRepository,
      ) => new FindAllTenantV2UseCase(inspireTenantService, tenantRepository),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        TenantsRepository,
      ],
    };
  }
}
