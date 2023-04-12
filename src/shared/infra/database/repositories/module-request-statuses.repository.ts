import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ModuleRequestStatus } from '~/requests/domain/entities/module-request-status.entity';
import { IModuleRequestStatusesRepository } from '~/requests/infra/contracts/repository/module-request-statuses-repository.contract';
import { ModuleRequestStatuses } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class ModuleRequestStatusesRepository
  implements IModuleRequestStatusesRepository
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
    attrs: IModuleRequestStatusesRepository.FindByIdInputAttrs,
  ): IModuleRequestStatusesRepository.FindByIdResult {
    const moduleRequestStatuses = await this.repository
      .createQueryBuilder('moduleRequestStatuses')
      .where('moduleRequestStatuses.id = :id', { id: attrs.id })
      .getOne();
    return moduleRequestStatuses
      ? new ModuleRequestStatus(moduleRequestStatuses)
      : null;
  }
}
