import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { RequestModuleAttempts } from '~/requests/domain/entities/request-module-attempts.entity';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { IRequestModuleAttemptsRepository } from '~/requests/infra/contracts/repository/request-module-attempts-repository.contract';
import { RequestModuleAttempts as RequestModuleAttemptsMapper } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

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
    attrs: {
      moduleId: string;
      requestModuleAttempt: RequestModuleAttempts;
    }[],
  ): Promise<void> {
    await this.dataSource.transaction(async (em: EntityManager) => {
      em.save(
        attrs.map(({ requestModuleAttempt: rma, moduleId: moduleRequestId }) =>
          this.repository.create({
            id: rma.id,
            moduleRequest: <any>{ id: moduleRequestId },
            requestModuleAttemptStatus: <any>{
              id: rma.requestModuleAttemptStatus.id,
            },
            provisionApiRequestBody: rma.provisionApiRequestBody,
            createdByUserId: rma.createdByUserId,
            ...rma,
          }),
        ),
      );
    });
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
    });
    if (!entity) return undefined;
    return new RequestModuleAttempts({
      createdByUserId: entity.createdByUserId,
      id: entity.id,
      createdDate: entity.createdDate,
      deletedDate: entity.deletedDate,
      provisionApiRequestBody: entity.provisionApiRequestBody,
      provisionApiResponseBody: entity.provisionApiResponseBody,
      provisionApiResponseStatusCode: entity.provisionApiResponseStatusCode,
      requestModuleAttemptStatus: new RequestModuleStatus({
        id: entity.requestModuleAttemptStatus.id,
        name: entity.requestModuleAttemptStatus.name,
      }),
      updatedDate: entity.updatedDate,
      webhookResponseBody: entity.webhookResponseBody,
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

  async update(attempt: RequestModuleAttempts): Promise<RequestModuleAttempts> {
    await this.repository.update(
      {
        id: attempt.id,
      },
      attempt,
    );

    const entity = await this.repository.findOne({ where: { id: attempt.id } });

    return new RequestModuleAttempts({
      id: entity.id,
      requestModuleAttemptStatus: new RequestModuleStatus({
        id: entity.requestModuleAttemptStatus.id,
        name: entity.requestModuleAttemptStatus.name,
        createdDate: entity.requestModuleAttemptStatus.createdDate,
        updatedDate: entity.requestModuleAttemptStatus.updatedDate,
        deletedDate: entity.requestModuleAttemptStatus.deletedDate,
      }),
      provisionApiRequestBody: entity.provisionApiRequestBody,
      provisionApiResponseBody: entity.provisionApiResponseBody,
      provisionApiResponseStatusCode: entity.provisionApiResponseStatusCode,
      webhookResponseBody: entity.webhookResponseBody,
      createdByUserId: entity.createdByUserId,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
      deletedDate: entity.deletedDate,
    });
  }
}
