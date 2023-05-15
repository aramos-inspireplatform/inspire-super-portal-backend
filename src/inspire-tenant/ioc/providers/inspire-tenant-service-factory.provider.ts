import { FactoryProvider } from '@nestjs/common';
import { InspireTenantProvidersSymbols } from '~/inspire-tenant/ioc/inspire-tenant-providers.symbols';
import { InspireTenantService } from '~/inspire-tenant/services/inspire-tenant.service';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class InspireTenantServiceFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: InspireTenantProvidersSymbols.INSPIRE_TENANT_SERVICE,
      useFactory: (httpClient: IHttpClient) =>
        new InspireTenantService(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
