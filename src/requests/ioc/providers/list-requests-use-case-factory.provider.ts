import { FactoryProvider } from '@nestjs/common';
import { ListRequestsUseCase } from '~/requests/application/use-case/list-requests.use-case';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { RequestRepository } from '~/shared/infra/database/repositories/request.repository';

export class ListRequestsUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: RequestProviderSymbols.LIST_ALL_REQUESTS_USE_CASE,
      useFactory: (requestRepository: IRequestRepository) =>
        new ListRequestsUseCase(requestRepository),
      inject: [RequestRepository],
    };
  }
}
