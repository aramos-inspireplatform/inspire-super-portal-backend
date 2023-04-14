import { FactoryProvider } from '@nestjs/common';
import { RequestCreatedEventUseCase } from '~/requests/application/request-created-event.use-case';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestModuleAttemptsStatusRepository } from '~/shared/infra/database/repositories/request-module-attempts-statuses.repository';
import { RequestModuleAttemptsRepository } from '~/shared/infra/database/repositories/request-module-attempts.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class RequestCreatedEventUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.REQUEST_CREATED_EVENT_USE_CASE,
      useFactory: (
        httpClient: IHttpClient,
        requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
        requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
      ) =>
        new RequestCreatedEventUseCase(
          httpClient,
          requestModuleAttemptsStatusRepository,
          requestModuleAttemptsRepository,
        ),
      inject: [
        AxiosHttpClientAdapter,
        RequestModuleAttemptsStatusRepository,
        RequestModuleAttemptsRepository,
      ],
    };
  }
}
