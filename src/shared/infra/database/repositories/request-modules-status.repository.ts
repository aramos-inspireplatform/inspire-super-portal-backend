import { Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RequestModuleStatus } from '~/requests/domain/entities/request-modules-status.entity';
import { IRequestModuleStatusRepository } from '~/requests/infra/contracts/repository/request-module-status-repository.contract';
import { ModuleRequestStatuses } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

export class RequestModuleStatusRepository
  implements IRequestModuleStatusRepository
{
  repository: Repository<ModuleRequestStatuses>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<ModuleRequestStatuses>(
      ModuleRequestStatuses,
    );
  }

  async findById(
    attrs: IRequestModuleStatusRepository.FindByIdInputAttrs,
  ): IRequestModuleStatusRepository.FindByIdResult {
    const requestModuleStatus = await this.repository
      .createQueryBuilder('requestModuleStatus')
      .where('requestModuleStatus.id = :id', { id: attrs.id })
      .getOne();
    return requestModuleStatus
      ? new RequestModuleStatus(requestModuleStatus)
      : null;
  }
}
