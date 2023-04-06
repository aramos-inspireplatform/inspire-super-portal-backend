import { FactoryProvider } from '@nestjs/common';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { CreateTenantUseCase } from '~/tenants/application/use-case/create-tenant.use-case';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';

export class CreateTenantUseCaseProviderFactory {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.CREATE_TENANT_USE_CASE,
      useFactory: (httpClient: IHttpClient) =>
        new CreateTenantUseCase(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
