import { FactoryProvider } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateRequestUseCase } from '~/requests/application/use-case/create-request.use-case';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { IEventEmitter } from '~/shared/application/contracts/event-emitter.contract';
import { ModulesRepository } from '~/shared/infra/database/repositories/module-request-types.repository';
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
        tenantRepository: ITenantRepository,
        requestStatusRepository: IRequestStatusesRepository,
        moduleRepository: IModuleRepository,
        requestRepository: IRequestRepository,
        eventEmitter: IEventEmitter,
      ) =>
        new CreateRequestUseCase(
          httpClient,
          tenantRepository,
          requestStatusRepository,
          moduleRepository,
          requestRepository,
          eventEmitter,
        ),
      inject: [
        AxiosHttpClientAdapter,
        TenantsRepository,
        RequestStatusesRepository,
        ModulesRepository,
        RequestRepository,
        EventEmitter2,
      ],
    };
  }
}
