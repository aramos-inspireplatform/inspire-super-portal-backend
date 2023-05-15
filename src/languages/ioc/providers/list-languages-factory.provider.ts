import { FactoryProvider } from '@nestjs/common';
import { ListLanguageUseCase } from '~/languages/application/use-case/list-languages.use-case';
import { LanguageProvidersSymbols } from '~/languages/ioc/languages-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ListLanguagueFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: LanguageProvidersSymbols.LIST_LANGUAGE_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListLanguageUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
