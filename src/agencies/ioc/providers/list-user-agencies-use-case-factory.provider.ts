import { FactoryProvider } from '@nestjs/common';
import { ListUserAgenciesUseCase } from '~/agencies/application/list-user-agencies.use-case';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ListUserAgenciesUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AgenciesProvidersSymbols.LIST_USER_AGENCIES_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListUserAgenciesUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
