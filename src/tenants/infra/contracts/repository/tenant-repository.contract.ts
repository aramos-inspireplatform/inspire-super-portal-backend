import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export interface ITenantRepository {
  save(attrs: ITenantRepository.SaveInputAttrs): ITenantRepository.SaveResult;
}

export namespace ITenantRepository {
  export type SaveInputAttrs = {
    tenant: Tenant;
  };

  export type SaveResult = Promise<Tenant>;
}
