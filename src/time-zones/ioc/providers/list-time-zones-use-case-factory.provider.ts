import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ListTimeZonesUseCase } from '~/time-zones/application/use-case/list-time-zones.use-case';
import { TimeZonesProvidersSymbols } from '~/time-zones/ioc/time-zones-providers.symbols';

export class ListTimeZonesUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TimeZonesProvidersSymbols.LIST_TIME_ZONES_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListTimeZonesUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
