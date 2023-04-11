import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { ListAdminUsersUseCase } from '~/users/application/use-case/list-admin-users.use-case';

export class ListAdminUsersUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.LIST_ADMIN_USERS_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListAdminUsersUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
