import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { CreateTenantUserUseCase } from '~/users/application/use-case/create-tenant-user.use-case';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';

export class CreateTenantUserUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.CREATE_TENANT_USER,
      useFactory: (httpClient: IHttpClient) =>
        new CreateTenantUserUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
