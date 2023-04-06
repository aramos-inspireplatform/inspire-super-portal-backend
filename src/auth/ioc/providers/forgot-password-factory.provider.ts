import { FactoryProvider } from '@nestjs/common';
import { ForgotPasswordResetUseCase } from '~/auth/application/use-case/forgot-password.use-case';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ForgotPasswordProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.FORGOT_PASSWORD_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ForgotPasswordResetUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
