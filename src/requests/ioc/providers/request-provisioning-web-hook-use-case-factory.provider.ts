import { FactoryProvider, Scope } from '@nestjs/common';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/request-provisioning-web-hook.use-case';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { IQueueService } from '~/shared/application/contracts/queue-service.contract';
import { RequestModuleAttemptsStatusRepository } from '~/shared/infra/database/repositories/request-module-attempts-statuses.repository';
import { RequestModuleAttemptsRepository } from '~/shared/infra/database/repositories/request-module-attempts.repository';
import { RequestModuleStatusRepository } from '~/shared/infra/database/repositories/request-modules-status.repository';
import { RequestModulesRepository } from '~/shared/infra/database/repositories/request-modules.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { TenantStatusesRepository } from '~/shared/infra/database/repositories/tenant-statuses.repository';
import { TenantsRepository } from '~/shared/infra/database/repositories/tenants.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { QueueService } from '~/shared/infra/sqs/queue.service';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';
import { ITenantStatusesRepository } from '~/tenants/infra/contracts/repository/tenant-statuses-repository.contract';

export class RequestProvisioningWebHookUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.REQUEST_PROVISIONING_WEB_HOOK_USE_CASE,
      useFactory: (
        requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
        requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
        requestRepository: IRequestRepository,
        requestStautusRepository: IRequestStatusesRepository,
        requestModuleRepository: IRequestModuleRepository,
        requestModuleStatusRepository: IRequestModuleStatusRepository,
        tenantRepository: ITenantRepository,
        tenantStatusRepository: ITenantStatusesRepository,
        queueService: IQueueService,
        httpClient: IHttpClient,
      ) =>
        new RequestProvisioningWebHookUseCase(
          requestModuleAttemptsRepository,
          requestModuleAttemptsStatusRepository,
          requestRepository,
          requestStautusRepository,
          requestModuleRepository,
          requestModuleStatusRepository,
          tenantRepository,
          tenantStatusRepository,
          queueService,
          httpClient,
        ),
      inject: [
        RequestModuleAttemptsRepository,
        RequestModuleAttemptsStatusRepository,
        RequestRepository,
        RequestStatusesRepository,
        RequestModulesRepository,
        RequestModuleStatusRepository,
        TenantsRepository,
        TenantStatusesRepository,
        QueueService,
        AxiosHttpClientAdapter,
      ],
      scope: Scope.REQUEST,
    };
  }
}
