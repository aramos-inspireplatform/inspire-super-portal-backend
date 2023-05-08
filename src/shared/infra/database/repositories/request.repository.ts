import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import {
  RequestModules as RequestModulesMapper,
  Requests,
} from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

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

    return new Request({
      id: storedRequestEntity.id,
      createdByUserEmail: storedRequestEntity.createdByUserEmail,
      createdByUserId: storedRequestEntity.createdByUserId,
      requestModules: storedRequestEntity.requestModules.map(
        (rm) =>
          new RequestModules({
            module: new Module({
              id: rm.moduleRequestType.id,
              deployUrl: rm.moduleRequestType.deployUrl,
              name: rm.moduleRequestType.name,
              createdDate: rm.moduleRequestType.createdDate,
              updatedDate: rm.moduleRequestType.updatedDate,
              deletedDate: rm.moduleRequestType.deletedDate,
            }),
            moduleRequestStatus: new RequestModuleStatus({
              id: rm.moduleRequestStatus.id,
              name: rm.moduleRequestStatus.name,
              createdDate: rm.moduleRequestStatus.createdDate,
              updatedDate: rm.moduleRequestStatus.updatedDate,
              deletedDate: rm.moduleRequestStatus.deletedDate,
            }),
            requestSettings: rm.requestSettings,
            apiRequestBody: rm.apiRequestBody,
            apiResponseBody: rm.apiResponseBody,
            attempts: rm.attempts,
            createdDate: rm.createdDate,
            updatedDate: rm.updatedDate,
            deletedDate: rm.deletedDate,
            id: rm.id,
            requestModuleAttempts: rm.requestModuleAttempts.map(
              (rma) =>
                new RequestModuleAttempts({
                  createdByUserId: rma.createdByUserId,
                  requestModuleAttemptStatus: new RequestModuleAttemptStatus(
                    rma.requestModuleAttemptStatus,
                  ),
                }),
            ),
          }),
      ),
      tenant: request.tenant,
      requestStatus: requestEntity.requestStatus,
      createdDate: requestEntity.createdDate,
      deletedDate: requestEntity.deletedDate,
      updatedDate: requestEntity.updatedDate,
    });
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

    return new Request({
      ...request,
      createdByUserEmail: request.createdByUserEmail,
      createdByUserId: request.createdByUserId,
      requestModules: request.requestModules.map(
        (rm) =>
          new RequestModules({
            ...(rm as any),
            module: new Module(rm.moduleRequestType),
            moduleRequestStatus: new RequestModuleStatus(
              rm.moduleRequestStatus,
            ),
            requestSettings: rm.requestSettings,
          }),
      ),
      requestStatus: new RequestStatus(request.requestStatus),
      tenant: new Tenant(request.tenant),
    });
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
      requests.map(
        (request) =>
          new Request({
            ...request,
            createdByUserEmail: request.createdByUserEmail,
            createdByUserId: request.createdByUserId,
            requestModules: request.requestModules.map(
              (rm) =>
                new RequestModules({
                  ...(rm as any),
                  module: new Module(rm.moduleRequestType),
                  moduleRequestStatus: new RequestModuleStatus(
                    rm.moduleRequestStatus,
                  ),
                  requestSettings: rm.requestSettings,
                }),
            ),
            requestStatus: new RequestStatus(request.requestStatus),
            tenant: new Tenant(request.tenant),
          }),
      ),
      count,
    ];
  }

  async update(request: Request): Promise<void> {
    await this.repository.save(request);
  }

  async findByRequestModuleId(requestModuleId: string): Promise<Request> {
    const storedRequestEntity = await this.repository.findOne({
      where: {
        requestModules: {
          id: requestModuleId,
        },
      },
    });

    return new Request({
      id: storedRequestEntity.id,
      createdByUserEmail: storedRequestEntity.createdByUserEmail,
      createdByUserId: storedRequestEntity.createdByUserId,
      requestModules: storedRequestEntity.requestModules.map(
        (rm) =>
          new RequestModules({
            module: new Module({
              id: rm.moduleRequestType.id,
              deployUrl: rm.moduleRequestType.deployUrl,
              name: rm.moduleRequestType.name,
              createdDate: rm.moduleRequestType.createdDate,
              updatedDate: rm.moduleRequestType.updatedDate,
              deletedDate: rm.moduleRequestType.deletedDate,
            }),
            moduleRequestStatus: new RequestModuleStatus({
              id: rm.moduleRequestStatus.id,
              name: rm.moduleRequestStatus.name,
              createdDate: rm.moduleRequestStatus.createdDate,
              updatedDate: rm.moduleRequestStatus.updatedDate,
              deletedDate: rm.moduleRequestStatus.deletedDate,
            }),
            requestSettings: rm.requestSettings,
            apiRequestBody: rm.apiRequestBody,
            apiResponseBody: rm.apiResponseBody,
            attempts: rm.attempts,
            createdDate: rm.createdDate,
            updatedDate: rm.updatedDate,
            deletedDate: rm.deletedDate,
            id: rm.id,
            requestModuleAttempts: rm.requestModuleAttempts.map(
              (rma) =>
                new RequestModuleAttempts({
                  createdByUserId: rma.createdByUserId,
                  requestModuleAttemptStatus: new RequestModuleAttemptStatus(
                    rma.requestModuleAttemptStatus,
                  ),
                }),
            ),
          }),
      ),
      tenant: new Tenant(storedRequestEntity.tenant),
      requestStatus: storedRequestEntity.requestStatus,
      createdDate: storedRequestEntity.createdDate,
      deletedDate: storedRequestEntity.deletedDate,
      updatedDate: storedRequestEntity.updatedDate,
    });
  }
}
