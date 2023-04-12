import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ModuleRequestType } from '~/requests/domain/entities/module-request-types.entity';
import { IModuleRequestTypeRepository } from '~/requests/infra/contracts/repository/module-request-type-repository.contract';
import { ModuleRequestTypes } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class ModuleRequestTypesRepository
  implements IModuleRequestTypeRepository
{
  repository: Repository<ModuleRequestTypes>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository =
      dataSource.getRepository<ModuleRequestTypes>(ModuleRequestTypes);
  }

  async findById(
    attrs: IModuleRequestTypeRepository.FindByIdInputAttrs,
  ): IModuleRequestTypeRepository.FindByIdResult {
    const moduleRequestType = await this.repository
      .createQueryBuilder('moduleRequestType')
      .where('moduleRequestType.id = :id', { id: attrs.id })
      .getOne();
    return moduleRequestType ? new ModuleRequestType(moduleRequestType) : null;
  }
}
