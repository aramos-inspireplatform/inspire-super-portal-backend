import { TenantStatus } from '~/tenants/domain/entity/tenant-statuses.entity';

export interface ITenantStatusesRepository {
  findById(
    attrs: ITenantStatusesRepository.FindByIdInputAttrs,
  ): ITenantStatusesRepository.FindByIdResult;
}

export namespace ITenantStatusesRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<TenantStatus | null>;
}
