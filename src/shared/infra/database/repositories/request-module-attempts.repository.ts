import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RequestModuleAttempt } from '~/requests/domain/entities/request-module-attempt.entity';
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

    return Object.assign(
      attrs.requestModuleAttempt,
      new RequestModuleAttempt({
        ...entity,
        moduleRequest: attrs.requestModuleAttempt.moduleRequest,
      }),
    );
  }
}
