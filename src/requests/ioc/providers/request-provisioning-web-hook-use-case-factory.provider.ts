import { FactoryProvider } from '@nestjs/common';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/use-case/request-provisioning-web-hook.use-case';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestModuleAttemptsStatusRepository } from '~/shared/infra/database/repositories/request-module-attempts-statuses.repository';
import { RequestModuleAttemptsRepository } from '~/shared/infra/database/repositories/request-module-attempts.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';

export class RequestProvisioningWebHookUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.REQUEST_PROVISIONING_WEB_HOOK_USE_CASE,
      useFactory: (
        requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
        requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
        requestRepository: IRequestRepository,
      ) =>
        new RequestProvisioningWebHookUseCase(
          requestModuleAttemptsRepository,
          requestModuleAttemptsStatusRepository,
          requestRepository,
        ),
      inject: [
        RequestModuleAttemptsRepository,
        RequestModuleAttemptsStatusRepository,
        RequestRepository,
      ],
    };
  }
}
