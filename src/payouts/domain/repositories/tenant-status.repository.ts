import { TenantStatusDomainEntity } from '~/payouts/domain/entities/tenant-status.entity';

export interface ITenantStatusRepository {
  findOneById(
    params: ITenantStatusRepository.FindOneById,
  ): Promise<TenantStatusDomainEntity>;
}

export namespace ITenantStatusRepository {
  export type FindOneById = Partial<{
    id: string;
  }>;
}
