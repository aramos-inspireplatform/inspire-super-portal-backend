import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ModuleRequestStatusesIds } from '~/requests/domain/constants/request-module-status-ids.constant';
import { RequestModules } from '~/requests/domain/entities/request-modules.entity';
import { IRequestModuleRepository } from '~/requests/infra/contracts/repository/request-module-repository.contract';
import { RequestModules as TypeOrmRequestModules } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { RequestModulesMapper } from '~/shared/infra/database/mapper/request-modules.mapper';

@Injectable()
export class RequestModulesRepository implements IRequestModuleRepository {
  repository: Repository<TypeOrmRequestModules>;
  MAX_ATTEMPTS_BATCH = 3;

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

  async findBatch(): Promise<RequestModules[]> {
    const requestModules = await this.repository
      .createQueryBuilder('requestModules')
      .leftJoinAndSelect(
        'requestModules.moduleRequestType',
        'moduleRequestType',
      )
      .leftJoinAndSelect(
        'requestModules.moduleRequestStatus',
        'moduleRequestStatus',
      )
      .leftJoinAndSelect(
        'requestModules.requestModuleAttempts',
        'requestModuleAttempts',
      )
      .leftJoinAndSelect(
        'requestModuleAttempts.requestModuleAttemptStatus',
        'requestModuleAttemptStatus',
      )
      .where(
        `(
            (moduleRequestStatus.id = :failedStatus and requestModules.attempts < :maxAttempts and requestModuleAttempts.deletedDate is null)
            or
            (moduleRequestStatus.id = :provisioningStatus and (requestModuleAttempts.createdDate + (moduleRequestType.time_span || 'minutes')::interval)::timestamp <= now() and requestModuleAttempts.deletedDate is null)
          )`,
        {
          provisioningStatus: ModuleRequestStatusesIds.Provisioning,
          failedStatus: ModuleRequestStatusesIds.Failed,
          maxAttempts: this.MAX_ATTEMPTS_BATCH,
        },
      )
      .getMany();

    return requestModules.map(RequestModulesMapper.modelToDomain);
  }
}
