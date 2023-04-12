import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Requests, ModuleRequests } from '~/shared/infra/database/entities';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class RequestRepository implements IRequestRepository {
  repository: Repository<Requests>;
  moduleRequestRepository: Repository<ModuleRequests>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<Requests>(Requests);
    this.moduleRequestRepository =
      dataSource.getRepository<ModuleRequests>(ModuleRequests);
  }

  async save(
    attrs: IRequestRepository.SaveInputAttrs,
  ): Promise<IRequestRepository.SaveResult> {
    const moduleRequestEntity = this.moduleRequestRepository.create({});
    const entity = this.repository.create({
      ...attrs.request,
    });
  }
}
