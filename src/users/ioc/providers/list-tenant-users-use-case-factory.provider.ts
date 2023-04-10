import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { ListTenantUsersUseCase } from '../../application/use-case/list-tenant-users.use-case';

export class ListTenantUsersUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.LIST_TENANT_USERS_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListTenantUsersUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
