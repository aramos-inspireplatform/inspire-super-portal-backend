import { TenantStatus } from '~/tenants/domain/entities/tenant-statuses.entity';

export interface ITenantStatusesRepository {
  findById(
    attrs: ITenantStatusesRepository.FindByIdInputAttrs,
  ): ITenantStatusesRepository.FindByIdResult;

  findBySlug(
    attrs: ITenantStatusesRepository.FindBySlugInputAttrs,
  ): ITenantStatusesRepository.FindBySlugResult;
}

export namespace ITenantStatusesRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<TenantStatus | null>;

  export type FindBySlugInputAttrs = { slug: string };
  export type FindBySlugResult = Promise<TenantStatus | null>;
}
