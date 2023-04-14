import { FactoryProvider } from '@nestjs/common';
import { ListAllRequestsUseCase } from '~/requests/application/list-all-requests.use-case';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';

export class ListAllRequestsUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.LIST_ALL_REQUESTS_USE_CASE,
      useFactory: (requestRepository: IRequestRepository) =>
        new ListAllRequestsUseCase(requestRepository),
      inject: [RequestRepository],
    };
  }
}
