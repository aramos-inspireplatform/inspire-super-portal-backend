import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Requests } from '~/shared/infra/database/entities';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { ModuleRequestRepository } from '~/shared/infra/database/repositories/module-request.repository';
import { RequestStatusesRepository } from '~/shared/infra/database/repositories/request-statuses.repository';
import { RequestModuleRequests } from '../entities/RequestModuleRequests';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';
import { ModuleRequest } from '~/modules-requests/domain/entities/module-request.entity';

@Injectable()
export class RequestRepository implements IRequestRepository {
  repository: Repository<Requests>;
  requestModuleRequestsRepository: Repository<RequestModuleRequests>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
    private readonly requestStatusesRepository: RequestStatusesRepository,
    private readonly moduleRequestRepository: ModuleRequestRepository,
  ) {
    this.repository = dataSource.getRepository<Requests>(Requests);
    this.requestModuleRequestsRepository =
      dataSource.getRepository<RequestModuleRequests>(RequestModuleRequests);
  }
  async listAndCount(
    attrs: IRequestRepository.ListInputAttrs,
  ): IRequestRepository.ListResult {
    const [requests, count] = await this.repository.findAndCount({
      skip: attrs.skip,
      take: attrs.take,
      relations: [
        'requestStatus',
        'tenant',
        'requestModuleRequests.moduleRequest',
      ],
    });

    return [
      requests.map(
        (request) =>
          new Request({
            ...request,
            requestStatus: new RequestStatus(request.requestStatus),
            requestModuleRequests: request.requestModuleRequests?.map(
              (requestModuleRequests) =>
                new ModuleRequest(requestModuleRequests.moduleRequest),
            ),
            tenant: new Tenant(request.tenant),
          }),
      ),
      count,
    ];
  }

  async save(
    attrs: IRequestRepository.SaveInputAttrs,
  ): IRequestRepository.SaveResult {
    return this.dataSource.transaction(async () => {
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
    });
  }
}
