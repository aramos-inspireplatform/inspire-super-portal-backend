import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Module } from '~/requests/domain/entities/module.entity';
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

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<Requests>(Requests);
  }

  async create(request: Request): Promise<void> {
    await this.dataSource.manager.transaction(
      async (entityManager: EntityManager) => {
        await entityManager.save(Requests, request as any);
        await entityManager.save(
          RequestModulesMapper,
          request.requestModules.map((rm) => ({
            ...rm,
            request: <any>request.id,
            moduleRequestType: <any>rm.module.id,
          })),
        );
      },
    );
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
}
