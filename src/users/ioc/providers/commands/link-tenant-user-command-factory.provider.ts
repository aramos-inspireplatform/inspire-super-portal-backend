import { FactoryProvider } from '@nestjs/common';
import { TenantsRepository } from '~/tenants/infra/repositories/tenants.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ITenantRepository } from '~/tenants/domain/repositories/tenant-repository.contract';
import { LinkTenantUserCommand } from '~/users/application/commands/link-tenant-user.command';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class LinkTenantUserCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.LINK_TENANT_USER_COMMAND,
      useFactory: (
        httpClient: IHttpClient,
        tenantRepository: ITenantRepository,
      ) => new LinkTenantUserCommand(httpClient, tenantRepository),
      inject: [AxiosHttpClientAdapter, TenantsRepository],
    };
  }
}
