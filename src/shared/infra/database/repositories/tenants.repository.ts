import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tenants } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { ITenantRepository } from '~/tenants/infra/contracts/repository/tenant-repository.contract';

@Injectable()
export class TenantsRepository implements ITenantRepository {
  repository: Repository<Tenants>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository<Tenants>(Tenants);
  }

  async save(
    attrs: ITenantRepository.SaveInputAttrs,
  ): ITenantRepository.SaveResult {
    const entity = await this.repository
      .create(attrs.tenant)
      .save({ reload: true });
    attrs.tenant.createdDate = entity.createdDate;
    attrs.tenant.updatedDate = entity.updatedDate;
    attrs.tenant.deleteDate = entity.deletedDate;
    return attrs.tenant;
  }
}
