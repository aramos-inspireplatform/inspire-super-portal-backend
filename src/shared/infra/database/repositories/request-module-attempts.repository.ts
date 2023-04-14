import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { RequestModuleAttempts as RequestModuleAttemptsMapper } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

@Injectable()
export class RequestModuleAttemptsRepository
  implements IRequestModuleAttemptsRepository
{
  repository: Repository<RequestModuleAttemptsMapper>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<RequestModuleAttemptsMapper>(
      RequestModuleAttemptsMapper,
    );
  }

  async createMultiple(
    requestModuleAttempts: RequestModuleAttempts[],
  ): Promise<void> {
    await this.dataSource.manager.transaction(
      async (entityManager: EntityManager) => {
        await entityManager.save(
          RequestModuleAttemptsMapper,
          requestModuleAttempts.map(
            (requestModuleAttempt) =>
              <any>{
                ...requestModuleAttempt,
                id: requestModuleAttempt.id,
                createdByUserId: requestModuleAttempt.createdByUserId,
                provisionApiRequestBody:
                  requestModuleAttempt.provisionApiRequestBody,
                moduleRequest: <any>requestModuleAttempt.moduleRequest.id,
                requestModuleAttemptStatus: <any>(
                  requestModuleAttempt.requestModuleAttemptStatus.id
                ),
              },
          ),
        );
      },
    );
  }

  async updateStatus(id: string, entity: RequestModuleAttempts): Promise<void> {
    await this.repository.update(
      {
        id,
      },
      {
        requestModuleAttemptStatus: <any>entity.requestModuleAttemptStatus.id,
      },
    );

    const storedEntity = await this.repository.findOneBy({
      id,
    });
    entity.updatedDate = storedEntity.updatedDate;
  }

  async findById(id: string): Promise<RequestModuleAttempts> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: [
        'requestModuleAttemptStatus',
        'moduleRequest',
        'moduleRequest.moduleRequestType',
        'moduleRequest.request',
        'moduleRequest.request.requestStatus',
      ],
    });

    return new RequestModuleAttempts({
      ...entity,
      moduleRequest: new RequestModules({
        ...entity.moduleRequest,
        request: new Request({
          id: entity.moduleRequest.request.id,
          createdDate: entity.moduleRequest.request.createdDate,
          updatedDate: entity.moduleRequest.request.updatedDate,
          deleteDate: entity.moduleRequest.request.deletedDate,
          createdByUserEmail: entity.moduleRequest.request.createdByUserEmail,
          createdByUserId: entity.moduleRequest.request.createdByUserId,
          requestModules: undefined,
          requestStatus: new RequestStatus(
            entity.moduleRequest.request.requestStatus,
          ),
          tenant: new Tenant(entity.moduleRequest.request.tenant),
        }),
        requestSettings: entity.moduleRequest.requestSettings,
        wrapperIntegrationId: entity.moduleRequest.wrapperIntegrationId,
        module: new Module(entity.moduleRequest.moduleRequestType),
        moduleRequestStatus: new RequestModuleStatus(
          entity.requestModuleAttemptStatus,
        ),
      }),
    });
  }

  async updateWebhookResponse(
    id: string,
    entity: RequestModuleAttempts,
  ): Promise<void> {
    await this.repository.update(
      {
        id,
      },
      {
        webhookResponseBody: <any>entity.webhookResponseBody,
      },
    );

    const storedEntity = await this.repository.findOneBy({
      id,
    });
    entity.updatedDate = storedEntity.updatedDate;
  }
}
