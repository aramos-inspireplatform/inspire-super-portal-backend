import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempt-status.entity';
import { RequestModuleAttempt } from '~/requests/domain/entities/request-module-attempt.entity';
import { RequestModule } from '~/requests/domain/entities/request-module.entity';
import { Request } from '~/requests/domain/entities/request.entity';
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
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<RequestModuleAttemptsMapper>(
      RequestModuleAttemptsMapper,
    );
  }

  async save(
    attrs: IRequestModuleAttemptsRepository.SaveInputAttrs,
  ): IRequestModuleAttemptsRepository.SaveResult {
    const entity = await this.repository
      .create({
        ...attrs.requestModuleAttempt,
        requestModuleAttemptStatus: <any>(
          attrs.requestModuleAttempt.requestModuleAttemptStatus.id
        ),
        moduleRequest: <any>attrs.requestModuleAttempt.moduleRequest.id,
      })
      .save();

    const savedEntity = await this.repository.findOne({
      where: { id: entity.id },
      relations: ['requestModuleAttemptStatus'],
    });

    return Object.assign(
      attrs.requestModuleAttempt,
      new RequestModuleAttempt({
        ...savedEntity,
        moduleRequest: attrs.requestModuleAttempt.moduleRequest,
        requestModuleAttemptStatus: new RequestModuleAttemptStatus(
          savedEntity.requestModuleAttemptStatus,
        ),
      }),
    );
  }

  async findById(
    attrs: IRequestModuleAttemptsRepository.FindByIdAttrs,
  ): IRequestModuleAttemptsRepository.FindByIdResult {
    const savedEntity = await this.repository.findOne({
      where: { id: attrs.id },
      relations: [
        'requestModuleAttemptStatus',
        'moduleRequest',
        'moduleRequest.request',
      ],
    });

    return new RequestModuleAttempt({
      ...savedEntity,
      moduleRequest: new RequestModule({
        module: new Module(savedEntity.moduleRequest.moduleRequestType),
        settings: savedEntity.moduleRequest.requestSettings,
        request: new Request({
          ...savedEntity.moduleRequest.request,
          requestModules: [],
        }),
      }),
      requestModuleAttemptStatus: new RequestModuleAttemptStatus(
        savedEntity.requestModuleAttemptStatus,
      ),
    });
  }

  async updateStatus(attrs: { statusId: string; id: string }): Promise<void> {
    await this.repository.update(
      {
        id: attrs.id,
      },
      { requestModuleAttemptStatus: <any>attrs.statusId },
    );
  }
}
