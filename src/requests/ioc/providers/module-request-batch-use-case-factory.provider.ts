import { FactoryProvider } from '@nestjs/common';
import { InspireTenantProvidersSymbols } from '~/inspire-tenant/ioc/inspire-tenant-providers.symbols';
import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
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
        inspireTenantService: IInspireTenantService,
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
        InspireTenantProvidersSymbols.INSPIRE_TENANT_SERVICE,
        AxiosHttpClientAdapter,
      ],
    };
  }
}
