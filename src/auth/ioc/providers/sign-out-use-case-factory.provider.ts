import { FactoryProvider } from '@nestjs/common';
import { SignOutUseCase } from '~/auth/application/use-case/sign-out.use-case';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class SignOutUseCaseFactoryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.SIGN_OUT_USE_CASE,
      useFactory: (httpClient: IHttpClient) => new SignOutUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
