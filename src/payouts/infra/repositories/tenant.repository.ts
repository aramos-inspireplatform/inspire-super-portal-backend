import { DataSource } from 'typeorm';
import { TenantAssembler } from '~/payouts/application/assemblers/tenant.assembler';
import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';
import { ITenantRepository } from '~/payouts/infra/repositories/contracts';
import { Tenants } from '~/shared/infra/database/entities';

export class TenantRepositoryTypeOrmAdapter implements ITenantRepository {
  constructor(private readonly dataSource: DataSource) {
    //
  }

  async findOne(
    params: ITenantRepository.FindOne,
  ): Promise<TenantDomainEntity> {
    const repository = this.dataSource.getRepository<Tenants>(Tenants);
    const tenant = await repository.findOne({
      where: { googleTenantId: params.gTenantId },
    });
    return TenantAssembler.assembly(tenant);
  }
}
