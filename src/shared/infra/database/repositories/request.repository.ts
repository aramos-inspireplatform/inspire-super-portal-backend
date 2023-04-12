import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Requests } from '~/shared/infra/database/entities';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { ModuleRequestRepository } from '~/shared/infra/database/repositories/module-request.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';
import { RequestModuleRequests } from '../entities/RequestModuleRequests';

@Injectable()
export class RequestRepository implements IRequestRepository {
  repository: Repository<Requests>;
  requestModuleRequestsRepository: Repository<RequestModuleRequests>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
    private readonly requestStatusesRepository: RequestStatusesRepository,
    private readonly moduleRequestRepository: ModuleRequestRepository,
  ) {
    this.repository = dataSource.getRepository<Requests>(Requests);
    this.requestModuleRequestsRepository =
      dataSource.getRepository<RequestModuleRequests>(RequestModuleRequests);
  }

  async save(
    attrs: IRequestRepository.SaveInputAttrs,
  ): IRequestRepository.SaveResult {
    const moduleRequests = await this.moduleRequestRepository.saveBatch({
      moduleRequests: attrs.request.requestModuleRequests,
    });

    const requestStatus = await this.requestStatusesRepository.findById({
      id: attrs.request.requestStatus.id,
    });
    const entity = this.repository.create({
      ...attrs.request,
      requestStatus,
    });
    const request = await this.repository.save(entity, { reload: true });
    await this.requestModuleRequestsRepository.save(
      this.requestModuleRequestsRepository.create(
        moduleRequests.map((moduleRequest) => {
          return {
            moduleRequest: <any>moduleRequest.id,
            request: <any>request.id,
          };
        }),
      ),
    );
    attrs.request.createdDate = new Date();
    return new Request(attrs.request);
  }
}
