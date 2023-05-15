import { FactoryProvider } from '@nestjs/common';
import { ListOneRequestUseCase } from '~/requests/application/list-one-request.use-case';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';

export class ListOneRequestUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.LIST_ONE_REQUEST_USE_CASE,
      useFactory: (requestRepository: IRequestRepository) =>
        new ListOneRequestUseCase(requestRepository),
      inject: [RequestRepository],
    };
  }
}
