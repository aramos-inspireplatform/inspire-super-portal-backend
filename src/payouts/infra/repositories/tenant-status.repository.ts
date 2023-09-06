import { DataSource } from 'typeorm';
import { TenantStatusAssembler } from '~/payouts/application/assemblers/tenant-status.assembler';
import { TenantStatusDomainEntity } from '~/payouts/domain/entities/tenant-status.entity';
import { ITenantStatusRepository } from '~/payouts/domain/repositories';
import { TenantStatusesDataMapper } from '~/shared/infra/database/entities';

export class TenantStatusRepositoryTypeOrmAdapter
  implements ITenantStatusRepository
{
  private readonly entity = 'tenantStatuses';
  private readonly repository;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository<TenantStatusesDataMapper>(
      TenantStatusesDataMapper,
    );
  }

  async findOneById(
    params: ITenantStatusRepository.FindOneById,
  ): Promise<TenantStatusDomainEntity> {
    const query = this.repository.createQueryBuilder(this.entity);
    query.where(`${this.entity}.id = :id`, { id: params.id });
    const tenantStatus = await query.getOne();

    return tenantStatus ? TenantStatusAssembler.assembly(tenantStatus) : null;
  }
}
