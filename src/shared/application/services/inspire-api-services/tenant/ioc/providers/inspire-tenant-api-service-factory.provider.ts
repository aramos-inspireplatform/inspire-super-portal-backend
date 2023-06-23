import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { InspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/inspire-tenant-api.service';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class InspireTenantApiServiceFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
      useFactory: (httpClient: IHttpClient) =>
        new InspireTenantApiService(httpClient),
      inject: [AxiosHttpClientAdapter],
    };
  }
}
