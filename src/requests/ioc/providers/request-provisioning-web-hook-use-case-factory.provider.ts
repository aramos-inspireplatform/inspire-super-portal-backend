import { FactoryProvider, Scope } from '@nestjs/common';
import { InspireTenantProvidersSymbols } from '~/inspire-tenant/ioc/inspire-tenant-providers.symbols';
import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/request-provisioning-web-hook.use-case';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { IQueueService } from '~/shared/application/contracts/queue-service.contract';
import { ModulesRepository } from '~/shared/infra/database/repositories/modules.repository';
import { RequestModuleAttemptsRepository } from '~/shared/infra/database/repositories/request-module-attempts.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { QueueService } from '~/shared/infra/sqs/queue.service';

export class RequestProvisioningWebHookUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.REQUEST_PROVISIONING_WEB_HOOK_USE_CASE,
      useFactory: (
        requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
        requestRepository: IRequestRepository,
        queueService: IQueueService,
        moduleRepository: IModuleRepository,
        inspireTenantService: IInspireTenantService,
        httpClient: IHttpClient,
      ) =>
        new RequestProvisioningWebHookUseCase(
          requestModuleAttemptsRepository,
          requestRepository,
          queueService,
          moduleRepository,
          inspireTenantService,
          httpClient,
        ),
      inject: [
        RequestModuleAttemptsRepository,
        RequestRepository,
        QueueService,
        ModulesRepository,
        InspireTenantProvidersSymbols.INSPIRE_TENANT_SERVICE,
        AxiosHttpClientAdapter,
      ],
      scope: Scope.REQUEST,
    };
  }
}
