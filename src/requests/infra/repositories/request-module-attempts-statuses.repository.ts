import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RequestModuleAttemptStatus } from '~/requests/domain/entities/request-module-attempts-status.entity';
import { IRequestModuleAttemptsStatusRepository } from '~/requests/domain/repositories/request-module-attempts-status-repository.contract';
import { RequestModuleAttemptStatuses } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class RequestModuleAttemptsStatusRepository
  implements IRequestModuleAttemptsStatusRepository
{
  repository: Repository<RequestModuleAttemptStatuses>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<RequestModuleAttemptStatuses>(
      RequestModuleAttemptStatuses,
    );
  }

  async findById(
    attrs: IRequestModuleAttemptsStatusRepository.FindByIdInputAttrs,
  ): IRequestModuleAttemptsStatusRepository.FindByIdResult {
    const statuses = await this.repository.findOne({ where: { id: attrs.id } });
    return new RequestModuleAttemptStatus(statuses);
  }
}
