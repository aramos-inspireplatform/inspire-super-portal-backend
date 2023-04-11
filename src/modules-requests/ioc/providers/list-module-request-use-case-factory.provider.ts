import { FactoryProvider } from '@nestjs/common';
import { ListModuleRequestUseCase } from '~/modules-requests/application/use-case/list-module-requests.use-case';
import { IModuleRequestRepository } from '~/modules-requests/infra/contracts/repository/module-request-repository.contract';
import { ModuleRequestsProvidersSymbols } from '~/modules-requests/ioc/module-requests-providers.symbols';
import { ModuleRequestRepository } from '~/shared/infra/database/repositories/module-request.repository';

export class ListModuleRequestUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: ModuleRequestsProvidersSymbols.LIST_MODULE_REQUEST_USE_CASE,
      useFactory: (moduleRequestRepository: IModuleRequestRepository) =>
        new ListModuleRequestUseCase(moduleRequestRepository),
      inject: [ModuleRequestRepository],
    };
  }
}
