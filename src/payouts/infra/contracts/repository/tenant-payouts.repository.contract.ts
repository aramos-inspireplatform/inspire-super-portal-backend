import { TenantPayouts } from '~/payouts/domain/entities/tenant-payouts.entity';

export interface ITenantPayoutsRepository {
  findAll(): ITenantPayoutsRepository.FindAllResult;
}

export namespace ITenantPayoutsRepository {
  export type FindAllResult = Promise<TenantPayouts[]>;
}
