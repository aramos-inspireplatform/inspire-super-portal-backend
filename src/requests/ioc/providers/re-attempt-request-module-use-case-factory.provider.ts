import { FactoryProvider } from '@nestjs/common';
import { InspireTenantProvidersSymbols } from '~/inspire-tenant/ioc/inspire-tenant-providers.symbols';
import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { ReAttemptRequestModuleUseCase } from '~/requests/application/re-attempt-request-module.use-case';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestModulesRepository } from '~/shared/infra/database/repositories/request-modules.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ReAttemptRequestModuleUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.RE_ATTEMPT_MODULE_REQUEST_USE_CASE,
      useFactory: (
        requestModulesRepository: IRequestModuleRepository,
        httpClient: IHttpClient,
        requestRepository: IRequestRepository,
        inspireTenantService: IInspireTenantService,
      ) =>
        new ReAttemptRequestModuleUseCase(
          requestModulesRepository,
          httpClient,
          requestRepository,
          inspireTenantService,
        ),
      inject: [
        RequestModulesRepository,
        AxiosHttpClientAdapter,
        RequestRepository,
        InspireTenantProvidersSymbols.INSPIRE_TENANT_SERVICE,
      ],
    };
  }
}
