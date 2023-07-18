import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { PaginationInput } from '~/shared/application/services/pagination';

export interface ITenantPayoutsRepository {
  findAll(
    params: ITenantPayoutsRepository.Input,
  ): ITenantPayoutsRepository.FindAllResult;
}

export namespace ITenantPayoutsRepository {
  export type Input = {
    pagination: PaginationInput;
  };

  export type FindAllResult = Promise<[TenantPayoutsEntity[], number]>;
}
