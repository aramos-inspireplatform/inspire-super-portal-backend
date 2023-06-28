import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { FindOneTenantDao as FindOneTenantDao } from '~/tenants/infra/queries/dao/find-one-tenant.dao';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repositories/tenant-repository.contract';

export class FindOneTenantDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.FIND_ONE_TENANT_DAO,
      useFactory: (
        inspireTenantApiService: IInspireTenantApiService,
        tenantRepository: ITenantRepository,
      ) => new FindOneTenantDao(inspireTenantApiService, tenantRepository),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        TenantsRepository,
      ],
    };
  }
}
