import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Requests, ModuleRequests } from '~/shared/infra/database/entities';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { ModuleRequestRepository } from '~/shared/infra/database/repositories/module-request.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';

@Injectable()
export class RequestRepository implements IRequestRepository {
  repository: Repository<Requests>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
    private readonly requestStatusesRepository: RequestStatusesRepository,
    private readonly moduleRequestRepository: ModuleRequestRepository,
  ) {
    this.repository = dataSource.getRepository<Requests>(Requests);
  }

  async save(
    attrs: IRequestRepository.SaveInputAttrs,
  ): Promise<IRequestRepository.SaveResult> {
    this.dataSource.transaction(async (transactionalEntityManager) => {
      const moduleRequestEntity = this.moduleRequestRepository.save({
        moduleRequest: attrs.request.requestModuleRequests,
      });
      const entity = this.repository.create({
        ...attrs.request,
      });
    });
  }
}
