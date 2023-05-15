import { FactoryProvider } from '@nestjs/common';
import { ListAgenciesUseCase } from '~/agencies/application/list-agencies.use-case';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ListAgenciesUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AgenciesProvidersSymbols.LIST_AGENCIES_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListAgenciesUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
