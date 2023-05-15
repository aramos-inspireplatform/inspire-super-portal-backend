import { FactoryProvider } from '@nestjs/common';
import { ListOneRequestModuleUseCase } from '~/requests/application/list-one-request-modules.use-case';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestModulesRepository } from '~/shared/infra/database/repositories/request-modules.repository';

export class ListOneRequestModuleUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.LIST_ONE_REQUEST_MODULE_USE_CASE,
      useFactory: (requestModuleRepository: IRequestModuleRepository) =>
        new ListOneRequestModuleUseCase(requestModuleRepository),
      inject: [RequestModulesRepository],
    };
  }
}
