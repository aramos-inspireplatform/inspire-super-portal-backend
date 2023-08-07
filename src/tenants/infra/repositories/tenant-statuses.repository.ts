import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { TenantStatusesDataMapper } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { TenantStatus } from '~/tenants/domain/entities/tenant-statuses.entity';
import { ITenantStatusesRepository } from '~/tenants/domain/repositories/tenant-statuses-repository.contract';

@Injectable()
export class TenantStatusesRepository implements ITenantStatusesRepository {
  repository: Repository<TenantStatusesDataMapper>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository<TenantStatusesDataMapper>(
      TenantStatusesDataMapper,
    );
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

  async findBySlug(
    attrs: ITenantStatusesRepository.FindBySlugInputAttrs,
  ): ITenantStatusesRepository.FindBySlugResult {
    const tenantStatuses = await this.repository
      .createQueryBuilder('tenantStatuses')
      .where('tenantStatuses.slug = :slug', { slug: attrs.slug })
      .getOne();

    return tenantStatuses ? new TenantStatus(tenantStatuses) : null;
  }
}
