import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tenants } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';
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
    attrs.tenant.deletedDate = entity.deletedDate;
    return attrs.tenant;
  }

  async findById(
    attrs: ITenantRepository.FindByIdInputAttrs,
  ): ITenantRepository.FindByIdResult {
    const tenant = await this.repository
      .createQueryBuilder('tenants')
      .leftJoinAndSelect('tenants.tenantStatus', 'tenantStatus')
      .where('tenants.id = :id', { id: attrs.id })
      .getOne();
    return tenant ? new Tenant(tenant) : null;
  }

  async listAndCount(
    attrs: ITenantRepository.ListAllInputAttrs,
  ): ITenantRepository.ListAllResult {
    const query = this.repository
      .createQueryBuilder('tenants')
      .leftJoinAndSelect('tenants.tenantStatus', 'tenantStatus')
      .skip(attrs.skip)
      .take(attrs.take);

    if (attrs.sortby) query.orderBy(`tenants.${attrs.sortby}`, 'ASC');

    const [tenants, total] = await query.getManyAndCount();
    return [tenants.map((tenant) => new Tenant(tenant)), total];
  }

  async findByIntegrationCode(
    attrs: ITenantRepository.FindByIntegrationCodeInputAttrs,
  ): ITenantRepository.FindByIntegrationCodeResult {
    const tenant = await this.repository
      .createQueryBuilder('tenants')
      .leftJoinAndSelect('tenants.tenantStatus', 'tenantStatus')
      .where('tenants.integrationCode = :id', { id: attrs.id })
      .getOne();
    return tenant ? new Tenant(tenant) : null;
  }
}
