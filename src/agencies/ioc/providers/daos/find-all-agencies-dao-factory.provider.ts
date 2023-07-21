import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { AgenciesProvidersSymbols } from '~/agencies/ioc/agencies-providers.symbols';
import { FindAllAgenciesDao } from '~/agencies/infra/daos/find-all-agencies.dao';

export class FindAllAgenciesDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: AgenciesProvidersSymbols.FIND_ALL_AGENCIES_DAO,
      useFactory: (
        inspireTenantApiService: IInspireTenantApiService,
        httpClient: IHttpClient,
      ) => new FindAllAgenciesDao(inspireTenantApiService, httpClient),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        AxiosHttpClientAdapter,
      ],
    };
  }
}
