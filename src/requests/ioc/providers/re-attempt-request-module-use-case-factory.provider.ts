import { FactoryProvider } from '@nestjs/common';
import { ReAttemptRequestModuleUseCase } from '~/requests/application/re-attempt-request-module.use-case';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestModuleAttemptsStatusRepository } from '~/shared/infra/database/repositories/request-module-attempts-statuses.repository';
import { RequestModuleAttemptsRepository } from '~/shared/infra/database/repositories/request-module-attempts.repository';
import { RequestModulesRepository } from '~/shared/infra/database/repositories/request-modules.repository';
import { AxiosHttpClientAdapter } from '~/shared/infra/http/axios/axios-http-client.adapter';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class ReAttemptRequestModuleUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.RE_ATTEMPT_MODULE_REQUEST_USE_CASE,
      useFactory: (
        requestModulesRepository: IRequestModuleRepository,
        requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
        httpClient: IHttpClient,
        requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
      ) =>
        new ReAttemptRequestModuleUseCase(
          requestModulesRepository,
          requestModuleAttemptsStatusRepository,
          httpClient,
          requestModuleAttemptsRepository,
        ),
      inject: [
        RequestModulesRepository,
        RequestModuleAttemptsStatusRepository,
        AxiosHttpClientAdapter,
        RequestModuleAttemptsRepository,
      ],
    };
  }
}
