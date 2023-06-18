import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { ModuleRequestBatchUseCase } from '~/requests/application/batch/module-request-batch.use-case';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestModulesRepository } from '~/shared/infra/database/repositories/request-modules.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ModuleRequestBatchUseCaseFactoryProvider {
  static register() {
    return <FactoryProvider>{
      provide: RequestProviderSymbols.MODULE_REQUEST_BATCH_USE_CASE,
      useFactory: (
        requestModuleRepository: IRequestModuleRepository,
        requestRepository: IRequestRepository,
        inspireTenantService: IInspireTenantApiService,
        httpClient: IHttpClient,
      ) =>
        new ModuleRequestBatchUseCase(
          requestModuleRepository,
          requestRepository,
          inspireTenantService,
          httpClient,
        ),
      inject: [
        RequestModulesRepository,
        RequestRepository,
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
        AxiosHttpClientAdapter,
      ],
    };
  }
}
