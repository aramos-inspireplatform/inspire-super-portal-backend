import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { RequestModules as TypeOrmRequestModules } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { RequestModulesMapper } from '~/shared/infra/database/mapper/request-modules.mapper';

@Injectable()
export class RequestModulesRepository implements IRequestModuleRepository {
  repository: Repository<TypeOrmRequestModules>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<TypeOrmRequestModules>(
      TypeOrmRequestModules,
    );
  }

  async findByRequestId(requestId: string): Promise<RequestModules[]> {
    const requestModules = await this.repository.find({
      where: { request: { id: requestId } },
      relations: ['moduleRequestType', 'moduleRequestStatus'],
    });
    return requestModules.map((rm) => RequestModulesMapper.modelToDomain(rm));
  }

  async findById(id: string): Promise<RequestModules> {
    const requestModule = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!requestModule) return null;

    return RequestModulesMapper.modelToDomain(requestModule);
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
    return RequestModulesMapper.modelToDomain(requestModuleEntity);
  }
}
