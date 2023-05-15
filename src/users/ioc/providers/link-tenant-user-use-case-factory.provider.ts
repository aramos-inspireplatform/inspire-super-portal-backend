import { FactoryProvider } from '@nestjs/common';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { LinkTenantUserUseCase } from '~/users/application/use-case/link-tenant-user.use-case';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class LinkTenantUserUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.LINK_TENANT_USER_USE_CASE,
      useFactory: (
        httpClient: IHttpClient,
        tenantRepository: ITenantRepository,
      ) => new LinkTenantUserUseCase(httpClient, tenantRepository),
      inject: [AxiosHttpClientAdapter, TenantsRepository],
    };
  }
}
