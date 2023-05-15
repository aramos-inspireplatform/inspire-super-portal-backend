import { FactoryProvider } from '@nestjs/common';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class SignInUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AuthProvidersSymbols.SIGN_IN_USE_CASE,
      useFactory: (httpClient: IHttpClient) => new SignInUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
