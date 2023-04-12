import { FactoryProvider } from '@nestjs/common';
import { IModuleRequestStatusesRepository } from '~/modules-requests/infra/contracts/repository/module-request-statuses-repository.contract';
import { IModuleRequestTypeRepository } from '~/modules-requests/infra/contracts/repository/module-request-type-repository.contract';
import { CreateRequestUseCase } from '~/requests/application/use-case/create-request.use-case';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { ModuleRequestStatusesRepository } from '~/shared/infra/database/repositories/module-request-statuses.repository';
import { ModuleRequestTypesRepository } from '~/shared/infra/database/repositories/module-request-types.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

export class CreateRequestUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.CREATE_REQUEST_USE_CASE,
      useFactory: (
        httpClient: IHttpClient,
        moduleRequestStatusesRepository: IModuleRequestStatusesRepository,
        moduleRequestTypeRepository: IModuleRequestTypeRepository,
        tenantRepository: ITenantRepository,
        requestStatusesRepository: IRequestStatusesRepository,
        requestRepository: IRequestRepository,
      ) =>
        new CreateRequestUseCase(
          httpClient,
          moduleRequestStatusesRepository,
          moduleRequestTypeRepository,
          tenantRepository,
          requestStatusesRepository,
          requestRepository,
        ),
      inject: [
        AxiosHttpClientAdapter,
        ModuleRequestStatusesRepository,
        ModuleRequestTypesRepository,
        TenantsRepository,
        RequestStatusesRepository,
        RequestRepository,
      ],
    };
  }
}
