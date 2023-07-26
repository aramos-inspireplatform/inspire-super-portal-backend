import { DataSource } from 'typeorm';
import { TenantAssembler } from '~/payouts/application/assemblers/tenant.assembler';
import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';
import { ITenantRepository } from '~/payouts/infra/repositories/contracts';
import { TenantsDataMapper } from '~/shared/infra/database/entities';

export class TenantRepositoryTypeOrmAdapter implements ITenantRepository {
  private readonly entity = 'tenants';
  private readonly repository;

  constructor(private readonly dataSource: DataSource) {
    this.repository =
      this.dataSource.getRepository<TenantsDataMapper>(TenantsDataMapper);
  }

  async findOneById(
    params: ITenantRepository.FindOneById,
  ): Promise<TenantDomainEntity> {
    const query = this.repository.createQueryBuilder(this.entity);
    query.leftJoinAndSelect(`${this.entity}.tenantBalances`, 'tenantBalances');
    query.leftJoinAndSelect(
      `tenantBalances.settlementCurrency`,
      'settlementCurrency',
    );
    query.where(`${this.entity}.id = :id`, { id: params.id });
    const tenant = await query.getOne();

    return tenant ? TenantAssembler.assembly(tenant) : null;
  }

  async findOneByGTenantId(
    params: ITenantRepository.FindOneByGTenantId,
  ): Promise<TenantDomainEntity> {
    const query = this.repository.createQueryBuilder(this.entity);
    query.leftJoinAndSelect(`${this.entity}.tenantBalances`, 'tenantBalances');
    query.leftJoinAndSelect(
      `tenantBalances.settlementCurrency`,
      'settlementCurrency',
    );
    query.where(`${this.entity}.googleTenantId = :googleTenantId`, {
      googleTenantId: params.gTenantId,
    });
    const tenant = await query.get();

    return tenant ? TenantAssembler.assembly(tenant) : null;
  }

  async save(input: TenantDomainEntity): Promise<void> {
    const tenant = this.repository.create({
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
      tenantBalances: input.getState().tenantBalances?.map((tenantBalance) => {
        return {
          id: tenantBalance.getState().id,
          settlementCurrencyId: tenantBalance.getState().settlementCurrencyId,
          amount: tenantBalance.getState().amount,
          createdDate: tenantBalance.getState().createdDate,
          updatedDate: tenantBalance.getState().updatedDate,
          deletedDate: tenantBalance.getState().deletedDate,
        };
      }),
      createdDate: input.getState().createdDate,
      updatedDate: input.getState().updatedDate,
      deletedDate: input.getState().deletedDate,
    });

    await this.repository.save(tenant);
  }
}
