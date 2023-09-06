import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';

export interface ITenantRepository {
  findOneById(
    params: ITenantRepository.FindOneById,
  ): Promise<TenantDomainEntity>;

  findOneByGTenantId(
    params: ITenantRepository.FindOneByGTenantId,
  ): Promise<TenantDomainEntity>;

  save(input: TenantDomainEntity): Promise<void>;
}

export namespace ITenantRepository {
  export type FindOneById = Partial<{
    id: string;
  }>;

  export type FindOneByGTenantId = Partial<{
    gTenantId: string;
  }>;
}
