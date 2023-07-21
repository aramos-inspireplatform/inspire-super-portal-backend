import { FactoryProvider, Scope } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/request-provisioning-web-hook.use-case';
import { IModuleRepository } from '~/requests/domain/repositories/module-repository.contract';
import { IRequestModuleAttemptsRepository } from '~/requests/domain/repositories/request-module-attempts-repository.contract';
import { IRequestRepository } from '~/requests/domain/repositories/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { IQueueService } from '~/shared/application/contracts/queue-service.contract';
import { ModulesRepository } from '~/requests/infra/repositories/modules.repository';
import { RequestModuleAttemptsRepository } from '~/requests/infra/repositories/request-module-attempts.repository';
import { RequestRepository } from '~/requests/infra/repositories/request.repository';
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
        inspireTenantService: IInspireTenantApiService,
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
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        AxiosHttpClientAdapter,
      ],
      scope: Scope.REQUEST,
    };
  }
}
