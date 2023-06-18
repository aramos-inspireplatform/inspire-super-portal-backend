import { FactoryProvider } from '@nestjs/common';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { ListAllTenantsUseCase } from '~/tenants/application/use-case/list-all-tenants.use-case';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';

export class ListAllTenantsUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.LIST_TENANTS_USE_CASE,
      useFactory: (tenantRepository: ITenantRepository) =>
        new ListAllTenantsUseCase(tenantRepository),
      inject: [TenantsRepository],
    };
  }
}
