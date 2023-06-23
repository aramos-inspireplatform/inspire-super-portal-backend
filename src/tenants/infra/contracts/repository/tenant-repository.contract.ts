import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export interface ITenantRepository {
  save(attrs: ITenantRepository.SaveInputAttrs): ITenantRepository.SaveResult;
  findById(
    attrs: ITenantRepository.FindByIdInputAttrs,
  ): ITenantRepository.FindByIdResult;
  listAndCount(
    attrs: ITenantRepository.ListAllInputAttrs,
  ): ITenantRepository.ListAllResult;
  findByIntegrationCode(
    attrs: ITenantRepository.FindByIntegrationCodeInputAttrs,
  ): Promise<Tenant | null>;
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

  export type ListAllInputAttrs = {
    skip: number;
    take: number;
    sortby?: string;
  };
  export type ListAllResult = Promise<[Tenant[], number]>;

  export type FindByIntegrationCodeInputAttrs = {
    id: string;
  };
  export type FindByIntegrationCodeResult = Promise<Tenant | null>;
}
