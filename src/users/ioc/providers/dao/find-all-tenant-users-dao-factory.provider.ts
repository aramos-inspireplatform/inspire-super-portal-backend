import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { FindAllTenantUsersDao } from '~/users/infra/queries/dao/find-all-tenant-users.dao';

export class FindAllTenantUsersDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.FIND_ALL_TENANT_USERS_DAO,
      useFactory: (
        inspireTenantApiService: IInspireTenantApiService,
        httpClient: IHttpClient,
      ) => new FindAllTenantUsersDao(inspireTenantApiService, httpClient),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        AxiosHttpClientAdapter,
      ],
    };
  }
}
