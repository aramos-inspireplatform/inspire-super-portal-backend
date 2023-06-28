import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export interface ITenantRepository {
  save(attrs: ITenantRepository.SaveInputAttrs): ITenantRepository.SaveResult;
  findById(
    attrs: ITenantRepository.FindByIdInputAttrs,
  ): ITenantRepository.FindByIdResult;
  listAndCount(
    attrs: ITenantRepository.ListAllInputAttrs,
  ): ITenantRepository.ListAllResult;
  findByGTenantId(
    attrs: ITenantRepository.FindByGTenantIdInputAttrs,
  ): ITenantRepository.FindByGTenantIdResult;
}

export namespace ITenantRepository {
  export type SaveInputAttrs = {
    tenant: Tenant;
  };

  export type SaveResult = Promise<Tenant>;

  export type FindByIdInputAttrs = {
    integrationCode: string;
  };
  export type FindByIdResult = Promise<Tenant | null>;

  export type ListAllInputAttrs = {
    skip: number;
    take: number;
    sortby?: string;
  };
  export type ListAllResult = Promise<[Tenant[], number]>;

  export type FindByGTenantIdInputAttrs = {
    gTenantId: string;
  };
  export type FindByGTenantIdResult = Promise<Tenant | null>;
}
