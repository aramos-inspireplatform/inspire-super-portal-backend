import { FactoryProvider } from '@nestjs/common';
import { InspireTenantProvidersSymbols } from '~/inspire-tenant/ioc/inspire-tenant-providers.symbols';
import { IInspireTenantService } from '~/inspire-tenant/services/contracts/inspire-tenant-service.contract';
import { RequestCreatedEventUseCase } from '~/requests/application/request-created-event.use-case';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class RequestCreatedEventUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.REQUEST_CREATED_EVENT_USE_CASE,
      useFactory: (
        httpClient: IHttpClient,
        requestRepository: IRequestRepository,
        inspireTenantService: IInspireTenantService,
      ) =>
        new RequestCreatedEventUseCase(
          httpClient,
          requestRepository,
          inspireTenantService,
        ),
      inject: [
        AxiosHttpClientAdapter,
        RequestRepository,
        InspireTenantProvidersSymbols.INSPIRE_TENANT_SERVICE,
      ],
    };
  }
}
