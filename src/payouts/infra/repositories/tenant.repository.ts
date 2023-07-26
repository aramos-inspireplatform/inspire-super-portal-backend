import { DataSource } from 'typeorm';
import { TenantAssembler } from '~/payouts/application/assemblers/tenant.assembler';
import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';
import { ITenantRepository } from '~/payouts/infra/repositories/contracts';
import { Tenants } from '~/shared/infra/database/entities';

export class TenantRepositoryTypeOrmAdapter implements ITenantRepository {
  constructor(private readonly dataSource: DataSource) {
    //
  }

  async findOneById(
    params: ITenantRepository.FindOneById,
  ): Promise<TenantDomainEntity> {
    const repository = this.dataSource.getRepository<Tenants>(Tenants);
    const tenant = await repository.findOne({
      where: { id: params.id },
    });

    return tenant ? TenantAssembler.assembly(tenant) : null;
  }

  async findOneByGTenantId(
    params: ITenantRepository.FindOneByGTenantId,
  ): Promise<TenantDomainEntity> {
    const repository = this.dataSource.getRepository<Tenants>(Tenants);
    const tenant = await repository.findOne({
      where: { googleTenantId: params.gTenantId },
    });

    return tenant ? TenantAssembler.assembly(tenant) : null;
  }

  async save(input: TenantDomainEntity): Promise<void> {
    const repository = this.dataSource.getRepository<Tenants>(Tenants);
    const tenant = repository.create({
      id: input.getState().id,
      name: input.getState().name,
      googleTenantId: input.getState().gTenantId,
      agencyId: input.getState().agencyId,
      agencyName: input.getState().agencyName,
      termsRecurringIntervalCount: input.getState().termsRecurringIntervalCount,
      termsRecurringIntervalId: input.getState().termsRecurringIntervalId,
      statusId: input.getState().tenantStatusId,
      totalPaidAmount: input.getState().totalPaidAmount,
      //lastTenantPayoutId: input.getState().lastTenantPayoutId,
      //tenantBalances: input.getState().tenantBalances,
      createdDate: input.getState().createdDate,
      updatedDate: input.getState().updatedDate,
      deletedDate: input.getState().deletedDate,
    });

    await repository.save(tenant);
  }
}
