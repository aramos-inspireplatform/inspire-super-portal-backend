import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { RequestModules as RequestModulesMapper } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

@Injectable()
export class RequestModulesRepository implements IRequestModuleRepository {
  repository: Repository<RequestModulesMapper>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository =
      dataSource.getRepository<RequestModulesMapper>(RequestModulesMapper);
  }

  async findByRequestId(requestId: string): Promise<RequestModules[]> {
    const requestModules = await this.repository.find({
      where: { request: { id: requestId } },
      relations: ['moduleRequestType', 'moduleRequestStatus'],
    });

    return requestModules.map(
      (rm) =>
        new RequestModules({
          id: rm.id,
          wrapperIntegrationId: rm.wrapperIntegrationId,
          module: new Module(rm.moduleRequestType),
          moduleRequestStatus: new RequestModuleStatus(rm.moduleRequestStatus),
          requestSettings: rm.requestSettings,
          apiRequestBody: rm.apiRequestBody,
          apiResponseBody: rm.apiRequestBody,
          request: undefined,
          attempts: undefined,
          createdDate: rm.createdDate,
          updatedDate: rm.updatedDate,
          deleteDate: rm.deletedDate,
        }),
    );
  }

  async findById(id: string): Promise<RequestModules> {
    const rm = await this.repository.findOne({
      where: { id },
      relations: [
        'request',
        'request.tenant',
        'moduleRequestType',
        'moduleRequestStatus',
        'requestModuleAttempts',
        'requestModuleAttempts.requestModuleAttemptStatus',
      ],
    });

    if (!rm) return undefined;

    return new RequestModules({
      id: rm.id,
      wrapperIntegrationId: rm.wrapperIntegrationId,
      module: new Module(rm.moduleRequestType),
      moduleRequestStatus: new RequestModuleStatus(rm.moduleRequestStatus),
      requestSettings: rm.requestSettings,
      apiRequestBody: rm.apiRequestBody,
      apiResponseBody: rm.apiRequestBody,
      request: new Request({
        ...rm.request,
        tenant: new Tenant(rm.request.tenant),
        requestModules: undefined,
      }),
      attempts: rm.requestModuleAttempts.length,
      requestModuleAttempts: rm.requestModuleAttempts.map(
        (rma) =>
          new RequestModuleAttempts({
            ...rma,
            createdByUserId: rma.createdByUserId,
            moduleRequest: undefined,
            requestModuleAttemptStatus: new RequestModuleAttemptStatus(
              rma.requestModuleAttemptStatus,
            ),
          }),
      ),
      createdDate: rm.createdDate,
      updatedDate: rm.updatedDate,
      deleteDate: rm.deletedDate,
    });
  }

  async updateStatus(id: string, statusId: string): Promise<void> {
    await this.repository.update(
      { id },
      { moduleRequestStatus: <any>statusId },
    );
  }

  async updateAttempts(id: string, count: number): Promise<void> {
    await this.repository.update({ id }, { attempts: count });
  }
}
