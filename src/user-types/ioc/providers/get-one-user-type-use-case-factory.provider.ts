import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { GetOneUserTypesUseCase } from '~/user-types/application/get-one-user-types.use-case';
import { UserTypesProvidersSymbols } from '~/user-types/ioc/user-types-providers.symbols';

export class GetOneUserTypesUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UserTypesProvidersSymbols.GET_ONE_USER_TYPES_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new GetOneUserTypesUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
