import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { PaginationInput } from '~/shared/application/services/pagination';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantPayoutsQuery {
  execute(
    params: IFindAllTenantPayoutsQuery.Input,
  ): IFindAllTenantPayoutsQuery.Output;
}

export namespace IFindAllTenantPayoutsQuery {
  export type Input = {
    pagination: PaginationInput;
  };

  export type Output = QueryPaginatedOutput<TenantPayoutsEntity>;
}
