import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ModuleRequestStatus } from '~/modules-requests/domain/entities/module-request-status.entity';
import { ModuleRequestType } from '~/modules-requests/domain/entities/module-request-types.entity';
import { ModuleRequest } from '~/modules-requests/domain/entities/module-request.entity';
import { IModuleRequestRepository } from '~/modules-requests/infra/contracts/repository/module-request-repository.contract';
import { ModuleRequests } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { ModuleRequestStatusesRepository } from '~/shared/infra/database/repositories/module-request-statuses.repository';
import { ModuleRequestTypesRepository } from '~/shared/infra/database/repositories/module-request-types.repository';

@Injectable()
export class ModuleRequestRepository implements IModuleRequestRepository {
  repository: Repository<ModuleRequests>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
    private readonly moduleRequestTypeRepository: ModuleRequestTypesRepository,
    private readonly moduleRequestStatusesRepository: ModuleRequestStatusesRepository,
  ) {
    this.repository = dataSource.getRepository<ModuleRequests>(ModuleRequests);
  }

  async save(
    attrs: IModuleRequestRepository.SaveInputAttrs,
  ): IModuleRequestRepository.SaveResult {
    const moduleRequestType = await this.moduleRequestTypeRepository.findById({
      id: attrs.moduleRequest.moduleRequestType.id,
    });
    const moduleRequestStatus =
      await this.moduleRequestStatusesRepository.findById({
        id: attrs.moduleRequest.moduleRequestStatus.id,
      });

    const entity = this.repository.create({
      ...attrs.moduleRequest,
      moduleRequestType,
      moduleRequestStatus,
    });

    await this.repository.save(entity, { reload: true });

    attrs.moduleRequest.createdDate = new Date();
    return new ModuleRequest({
      ...entity,
      moduleRequestStatus: new ModuleRequestStatus(moduleRequestStatus),
      moduleRequestType: new ModuleRequestType(moduleRequestType),
    });
  }

  async findByIdAndTenant(
    atts: IModuleRequestRepository.FindByIdAndTenantInputAttrs,
  ): IModuleRequestRepository.FindByIdAndTenantResult {
    const moduleRequest = await this.repository
      .createQueryBuilder('moduleRequest')
      .where('moduleRequestType.id = :id', { id: atts.id })
      .andWhere('moduleRequest.tenantId = :tenantId', {
        tenantId: atts.tenantId,
      })
      .leftJoinAndSelect(
        'moduleRequest.moduleRequestStatus',
        'moduleRequestStatus',
      )
      .leftJoinAndSelect('moduleRequest.moduleRequestType', 'moduleRequestType')
      .getOne();

    return moduleRequest
      ? new ModuleRequest({
          ...moduleRequest,
          moduleRequestStatus: new ModuleRequestStatus(
            moduleRequest.moduleRequestStatus,
          ),
          moduleRequestType: new ModuleRequestType(
            moduleRequest.moduleRequestType,
          ),
        })
      : null;
  }
}
