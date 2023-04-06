import { FactoryProvider } from '@nestjs/common';
import { ListCountriesUseCase } from '~/countries/application/use-case/list-countries.use-case';
import { CountriesProvidersSymbols } from '~/countries/ioc/countries-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ListCountriesUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: CountriesProvidersSymbols.LIST_COUNTRIES_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListCountriesUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
