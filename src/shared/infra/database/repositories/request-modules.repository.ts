import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { RequestModules as RequestModulesMapper } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

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
          // request: undefined,
          attempts: undefined,
          createdDate: rm.createdDate,
          updatedDate: rm.updatedDate,
          deletedDate: rm.deletedDate,
        }),
    );
  }

  async findById(id: string): Promise<RequestModules> {
    const requestModule = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!requestModule) return null;

    return new RequestModules({
      module: new Module({
        id: requestModule.moduleRequestType.id,
        name: requestModule.moduleRequestType.name,
        deployUrl: requestModule.moduleRequestType.deployUrl,
        createdDate: requestModule.moduleRequestType.createdDate,
        deletedDate: requestModule.moduleRequestType.deletedDate,
        updatedDate: requestModule.moduleRequestType.updatedDate,
      }),
      moduleRequestStatus: new RequestModuleStatus({
        id: requestModule.moduleRequestStatus.id,
        name: requestModule.moduleRequestStatus.name,
        createdDate: requestModule.moduleRequestStatus.createdDate,
        deletedDate: requestModule.moduleRequestStatus.deletedDate,
        updatedDate: requestModule.moduleRequestStatus.updatedDate,
      }),
      requestSettings: requestModule.requestSettings,
      apiRequestBody: requestModule.apiRequestBody,
      apiResponseBody: requestModule.apiRequestBody,
      attempts: requestModule.attempts,
      createdDate: requestModule.createdDate,
      updatedDate: requestModule.updatedDate,
      deletedDate: requestModule.deletedDate,
      id: requestModule.id,
      requestModuleAttempts: requestModule.requestModuleAttempts.map(
        (requestModuleAttempt) =>
          new RequestModuleAttempts({
            createdByUserId: requestModuleAttempt.createdByUserId,
            id: requestModuleAttempt.id,
            provisionApiRequestBody:
              requestModuleAttempt.provisionApiRequestBody,
            requestModuleAttemptStatus: new RequestModuleAttemptStatus({
              id: requestModuleAttempt.requestModuleAttemptStatus.id,
              name: requestModuleAttempt.requestModuleAttemptStatus.name,
              createdDate:
                requestModuleAttempt.requestModuleAttemptStatus.createdDate,
              deletedDate:
                requestModuleAttempt.requestModuleAttemptStatus.deletedDate,
              updatedDate:
                requestModuleAttempt.requestModuleAttemptStatus.updatedDate,
            }),
            createdDate: requestModuleAttempt.createdDate,
            updatedDate: requestModuleAttempt.updatedDate,
            deletedDate: requestModuleAttempt.deletedDate,
            provisionApiResponseBody:
              requestModuleAttempt.provisionApiResponseBody,
            provisionApiResponseStatusCode:
              requestModuleAttempt.provisionApiResponseStatusCode,
            webhookResponseBody: requestModuleAttempt.webhookResponseBody,
            wrapperIntegrationId: requestModuleAttempt.wrapperIntegrationId,
          }),
      ),
      wrapperIntegrationId: requestModule.wrapperIntegrationId,
    });

    // const rm = await this.repository.findOne({
    //   where: { id },
    //   relations: [
    //     'request',
    //     'request.tenant',
    //     'moduleRequestType',
    //     'moduleRequestStatus',
    //     'requestModuleAttempts',
    //     'requestModuleAttempts.requestModuleAttemptStatus',
    //   ],
    // });

    // if (!rm) return undefined;

    // return new RequestModules({
    //   id: rm.id,
    //   wrapperIntegrationId: rm.wrapperIntegrationId,
    //   module: new Module(rm.moduleRequestType),
    //   moduleRequestStatus: new RequestModuleStatus(rm.moduleRequestStatus),
    //   requestSettings: rm.requestSettings,
    //   apiRequestBody: rm.apiRequestBody,
    //   apiResponseBody: rm.apiRequestBody,
    //   // request: new Request({
    //   //   ...rm.request,
    //   //   tenant: new Tenant(rm.request.tenant),
    //   //   requestModules: undefined,
    //   // }),
    //   attempts: rm.requestModuleAttempts.length,
    //   requestModuleAttempts: rm.requestModuleAttempts.map(
    //     (rma) =>
    //       new RequestModuleAttempts({
    //         ...rma,
    //         createdByUserId: rma.createdByUserId,
    //         requestModuleAttemptStatus: new RequestModuleAttemptStatus(
    //           rma.requestModuleAttemptStatus,
    //         ),
    //       }),
    //   ),
    //   createdDate: rm.createdDate,
    //   updatedDate: rm.updatedDate,
    //   deletedDate: rm.deletedDate,
    // });
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

  async update(requestModule: RequestModules): Promise<RequestModules> {
    await this.repository.save(requestModule);
    const requestModuleEntity = await this.repository.findOne({
      where: {
        id: requestModule.id,
      },
    });
    return new RequestModules({
      ...requestModuleEntity,
      module: new Module(requestModuleEntity.moduleRequestType),
      moduleRequestStatus: new RequestModuleStatus({
        id: requestModuleEntity.moduleRequestStatus.id,
        name: requestModuleEntity.moduleRequestStatus.name,
        createdDate: requestModuleEntity.moduleRequestStatus.createdDate,
        deletedDate: requestModuleEntity.moduleRequestStatus.deletedDate,
        updatedDate: requestModuleEntity.moduleRequestStatus.updatedDate,
      }),
      requestModuleAttempts: requestModuleEntity.requestModuleAttempts.map(
        (requestModuleAttempt) => {
          return new RequestModuleAttempts({
            ...requestModuleAttempt,
            requestModuleAttemptStatus: new RequestModuleAttemptStatus({
              id: requestModuleAttempt.requestModuleAttemptStatus.id,
              name: requestModuleAttempt.requestModuleAttemptStatus.name,
              createdDate:
                requestModuleAttempt.requestModuleAttemptStatus.createdDate,
              deletedDate:
                requestModuleAttempt.requestModuleAttemptStatus.deletedDate,
              updatedDate:
                requestModuleAttempt.requestModuleAttemptStatus.updatedDate,
            }),
          });
        },
      ),
    });
  }
}
