import { FactoryProvider } from '@nestjs/common';
import { TenantStatusesRepository } from '~/shared/infra/database/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { CreateTenantUseCase } from '~/tenants/application/use-case/create-tenant.use-case';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repository/tenant-statuses-repository.contract';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';

export class CreateTenantUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: TenantProvidersSymbols.CREATE_TENANT_USE_CASE,
      useFactory: (
        httpClient: IHttpClient,
        tenantRepository: ITenantRepository,
        tenantStatusesRepository: ITenantStatusesRepository,
      ) =>
        new CreateTenantUseCase(
          httpClient,
          tenantRepository,
          tenantStatusesRepository,
        ),
      inject: [
        AxiosHttpClientAdapter,
        TenantsRepository,
        TenantStatusesRepository,
      ],
    };
  }
}
