import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ListUserTypesUseCase } from '~/user-types/application/list-user-types.use-case';
import { UserTypesProvidersSymbols } from '~/user-types/ioc/user-types-providers.symbols';

export class ListUserTypesUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UserTypesProvidersSymbols.LIST_USER_TYPES_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListUserTypesUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
