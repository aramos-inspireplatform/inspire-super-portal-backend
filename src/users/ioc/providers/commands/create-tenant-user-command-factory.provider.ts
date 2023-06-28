import { FactoryProvider } from '@nestjs/common';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repositories/tenant-repository.contract';
import { CreateTenantUserCommand } from '~/users/application/commands/create-tenant-user.command';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class CreateTenantUserCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.CREATE_TENANT_USER_COMMAND,
      useFactory: (
        httpClient: IHttpClient,
        tenantRepository: ITenantRepository,
      ) => new CreateTenantUserCommand(httpClient, tenantRepository),
      inject: [AxiosHttpClientAdapter, TenantsRepository],
    };
  }
}
