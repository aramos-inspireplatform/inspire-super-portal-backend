import { FactoryProvider } from '@nestjs/common';
import { RequestProvisioningWebHookUseCase } from '~/requests/application/request-provisioning-web-hook.use-case';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/infra/contracts/repository/request-module-attempts-status-repository.contract';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestModuleAttemptsStatusRepository } from '~/shared/infra/database/repositories/request-module-attempts-statuses.repository';
import { RequestModuleAttemptsRepository } from '~/shared/infra/database/repositories/request-module-attempts.repository';
import { RequestModuleStatusRepository } from '~/shared/infra/database/repositories/request-modules-status.repository';
import { RequestModulesRepository } from '~/shared/infra/database/repositories/request-modules.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';

export class RequestProvisioningWebHookUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.REQUEST_PROVISIONING_WEB_HOOK_USE_CASE,
      useFactory: (
        requestModuleAttemptsRepository: IRequestModuleAttemptsRepository,
        requestModuleAttemptsStatusRepository: IRequestModuleAttemptsStatusRepository,
        requestRepository: IRequestRepository,
        requestStautusRepository: IRequestStatusesRepository,
        requestModuleRepository: IRequestModuleRepository,
        requestModuleStatusRepository: IRequestModuleStatusRepository,
      ) =>
        new RequestProvisioningWebHookUseCase(
          requestModuleAttemptsRepository,
          requestModuleAttemptsStatusRepository,
          requestRepository,
          requestStautusRepository,
          requestModuleRepository,
          requestModuleStatusRepository,
        ),
      inject: [
        RequestModuleAttemptsRepository,
        RequestModuleAttemptsStatusRepository,
        RequestRepository,
        RequestStatusesRepository,
        RequestModulesRepository,
        RequestModuleStatusRepository,
      ],
    };
  }
}
