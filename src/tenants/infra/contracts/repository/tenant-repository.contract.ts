import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export interface ITenantRepository {
  save(attrs: ITenantRepository.SaveInputAttrs): ITenantRepository.SaveResult;
  findById(
    attrs: ITenantRepository.FindByIdInputAttrs,
  ): ITenantRepository.FindByIdResult;
}

export namespace ITenantRepository {
  export type SaveInputAttrs = {
    tenant: Tenant;
  };

  export type SaveResult = Promise<Tenant>;

  export type FindByIdInputAttrs = {
    id: string;
  };
  export type FindByIdResult = Promise<Tenant | null>;
}
