import { TenantDomainEntity } from '~/payouts/domain/entities/tenant.entity';

export interface ITenantRepository {
  findOne(params: ITenantRepository.FindOne): Promise<TenantDomainEntity>;
}

export namespace ITenantRepository {
  export type Find = Partial<{
    gTenantId: string;
  }>;

  export type FindOne = Find;
}
