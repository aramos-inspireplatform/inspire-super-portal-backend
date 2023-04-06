import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ListAllTenantsUseCase } from '~/tenants/application/use-case/list-all-tenants.use-case';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';

export class ListAlltenantsUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.LIST_TENANTS_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new ListAllTenantsUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
