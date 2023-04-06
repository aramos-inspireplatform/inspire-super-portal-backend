import { FactoryProvider } from '@nestjs/common';
import { RefreshTokenUseCase } from '~/auth/application/use-case/refresh-token.use-case';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class RefreshTokenProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.REFRESH_TOKEN_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new RefreshTokenUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
