import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ListOneUserUseCase } from '~/users/application/use-case/list-one-user.use-case';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class ListOneUserUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.LIST_ONE_USER_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListOneUserUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
