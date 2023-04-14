import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Module } from '~/requests/domain/entities/module.entity';
import { IModuleRepository } from '~/requests/infra/contracts/repository/module-repository.contract';
import { Modules } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class ModulesRepository implements IModuleRepository {
  repository: Repository<Modules>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<Modules>(Modules);
  }

  async findById(
    attrs: IModuleRepository.FindByIdInputAttrs,
  ): IModuleRepository.FindByIdResult {
    const moduleRequestType = await this.repository
      .createQueryBuilder('moduleRequestType')
      .where('moduleRequestType.id = :id', { id: attrs.id })
      .getOne();
    return moduleRequestType ? new Module(moduleRequestType) : null;
  }
}
