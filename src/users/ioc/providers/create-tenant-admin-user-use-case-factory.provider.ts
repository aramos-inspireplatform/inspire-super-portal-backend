import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { CreateTenantAdminUserUseCase } from '~/users/application/use-case/create-tenant-admin-user.use-case';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class CreateTenantAdminUserUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.CREATE_TENANT_ADMIN_USER_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new CreateTenantAdminUserUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
