import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { FindOneUserDao } from '~/users/infra/queries/dao/find-one-user.dao';

export class FindOneUserDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: UsersProvidersSymbols.FIND_ONE_USER_DAO,
      useFactory: (
        inspireTenantApiService: IInspireTenantApiService,
        httpClient: IHttpClient,
      ) => new FindOneUserDao(inspireTenantApiService, httpClient),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        AxiosHttpClientAdapter,
      ],
    };
  }
}
