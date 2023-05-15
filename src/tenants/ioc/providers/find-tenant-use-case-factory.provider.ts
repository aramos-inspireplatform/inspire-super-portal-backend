import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { FindTenantUseCase } from '~/tenants/application/use-case/find-tenant.use-case';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';

export class FindTenantUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.FIND_TENANT_USE_CASE,
      useFactory: (
        httpClient: IHttpClient,
        tenantRepository: ITenantRepository,
      ) => new FindTenantUseCase(httpClient, tenantRepository),
      inject: [AxiosHttpClientAdapter, TenantsRepository],
    };
  }
}
