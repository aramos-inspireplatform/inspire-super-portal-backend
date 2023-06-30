import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { TenantStatuses } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { TenantStatus } from '~/tenants/domain/entities/tenant-statuses.entity';
import { ITenantStatusesRepository } from '~/tenants/domain/repositories/tenant-statuses-repository.contract';

@Injectable()
export class TenantStatusesRepository implements ITenantStatusesRepository {
  repository: Repository<TenantStatuses>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository =
      this.dataSource.getRepository<TenantStatuses>(TenantStatuses);
  }

  async findById(
    attrs: ITenantStatusesRepository.FindByIdInputAttrs,
  ): ITenantStatusesRepository.FindByIdResult {
    const tenantStatuses = await this.repository
      .createQueryBuilder('tenantStatuses')
      .where('tenantStatuses.id = :id', { id: attrs.id })
      .getOne();
    return tenantStatuses ? new TenantStatus(tenantStatuses) : null;
  }
}
