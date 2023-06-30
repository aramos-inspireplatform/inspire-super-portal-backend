import { FactoryProvider } from '@nestjs/common';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { RequestCreatedEventUseCase } from '~/requests/application/request-created-event.use-case';
import { IRequestRepository } from '~/requests/domain/repositories/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestRepository } from '~/requests/infra/repositories/request.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class RequestCreatedEventUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.REQUEST_CREATED_EVENT_USE_CASE,
      useFactory: (
        httpClient: IHttpClient,
        requestRepository: IRequestRepository,
        inspireTenantService: IInspireTenantApiService,
      ) =>
        new RequestCreatedEventUseCase(
          httpClient,
          requestRepository,
          inspireTenantService,
        ),
      inject: [
        AxiosHttpClientAdapter,
        RequestRepository,
        InspireApiServicesProvidersSymbols.INSPIRE_TENANT_API_SERVICE,
      ],
    };
  }
}
