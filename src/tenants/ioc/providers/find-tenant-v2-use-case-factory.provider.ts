import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { FindTenantV2UseCase } from '~/tenants/application/use-case/find-tenant-v2.use-case';

export class FindTenantV2UseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.FIND_TENANT_V2_USE_CASE,
      useFactory: (
        inspireTenantService: IInspireTenantApiService,
        tenantRepository: ITenantRepository,
      ) => new FindTenantV2UseCase(inspireTenantService, tenantRepository),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        TenantsRepository,
      ],
    };
  }
}
