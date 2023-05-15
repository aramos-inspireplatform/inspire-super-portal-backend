import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import {
  RequestModules as RequestModulesMapper,
  Requests,
} from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { RequestMapper } from '~/shared/infra/database/mapper/request.mapper';

@Injectable()
export class RequestRepository implements IRequestRepository {
  repository: Repository<Requests>;
  requestModuleRepository: Repository<RequestModulesMapper>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<Requests>(Requests);
    this.requestModuleRepository =
      dataSource.getRepository<RequestModulesMapper>(RequestModulesMapper);
  }

  async create(request: Request) {
    const requestEntity = this.repository.create({
      id: request.id,
      createdByUserEmail: request.createdByUserEmail,
      createdByUserId: request.createdByUserId,
      requestStatus: <any>{ id: request.requestStatus.id },
      tenant: <any>{ id: request.tenant.id },
    });

    const requestModules = this.requestModuleRepository.create(
      request.requestModules.map((rm) => ({
        id: rm.id,
        request: <any>{ id: request.id },
        wrapperIntegrationId: rm.wrapperIntegrationId,
        moduleRequestStatus: <any>{ id: rm.moduleRequestStatus.id },
        moduleRequestType: <any>{ id: rm.module.id },
        apiRequestBody: rm.apiRequestBody,
        apiResponseBody: rm.apiResponseBody,
        requestSettings: rm.requestSettings,
        attempts: rm.attempts,
      })),
    );

    await this.dataSource.transaction(async () => {
      await this.repository.save(requestEntity, { reload: true });
      await this.requestModuleRepository.save(requestModules, { reload: true });
    });

    const storedRequestEntity = await this.repository.findOne({
      where: { id: requestEntity.id },
    });

    return RequestMapper.modelToDomain(storedRequestEntity);
  }

  async findById(id: string): Promise<Request> {
    const request = await this.repository.findOne({
      where: { id },
      relations: [
        'requestStatus',
        'tenant',
        'requestModules',
        'requestModules.moduleRequestType',
        'requestModules.moduleRequestStatus',
      ],
    });

    if (!request) return null;

    return RequestMapper.modelToDomain(request);
  }

  async updateStatus(id: string, statusId: string): Promise<void> {
    await this.repository.update({ id }, { requestStatus: <any>statusId });
  }

  async findAll(attrs: {
    page: number;
    pageSize: number;
  }): Promise<[Request[], number]> {
    const [requests, count] = await this.repository.findAndCount({
      relations: [
        'requestStatus',
        'tenant',
        'requestModules',
        'requestModules.moduleRequestType',
        'requestModules.moduleRequestStatus',
      ],
      skip: attrs.page * attrs.pageSize,
      take: attrs.pageSize,
    });

    return [
      requests.map((request) => RequestMapper.modelToDomain(request)),
      count,
    ];
  }

  async update(request: Request): Promise<void> {
    await this.repository.save(request);
  }

  async findByRequestModuleId(
    requestModuleId: string,
  ): Promise<Request | null> {
    const storedRequestEntity = await this.repository.findOne({
      where: {
        requestModules: {
          id: requestModuleId,
        },
      },
    });

    if (!storedRequestEntity) return null;

    return RequestMapper.modelToDomain(storedRequestEntity);
  }

  async findByAttemptId(attemptId: string): Promise<Request | null> {
    const storedRequestEntity = await this.repository.findOne({
      where: {
        requestModules: {
          requestModuleAttempts: {
            id: attemptId,
          },
        },
      },
    });

    if (!storedRequestEntity) return null;

    return RequestMapper.modelToDomain(storedRequestEntity);
  }
}
