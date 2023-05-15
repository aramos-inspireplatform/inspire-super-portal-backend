import { Tenant } from '~/tenants/domain/entity/tenant.entity';

export interface ITenantRepository {
  save(attrs: ITenantRepository.SaveInputAttrs): ITenantRepository.SaveResult;
  findById(
    attrs: ITenantRepository.FindByIdInputAttrs,
  ): ITenantRepository.FindByIdResult;
  listAndCount(
    attrs: ITenantRepository.ListAllInputAttrs,
  ): ITenantRepository.ListAllResult;
  findByWrapperIntegrationId(
    attrs: ITenantRepository.FindByWrapperIntegrationIdInputAttrs,
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
  };
  export type ListAllResult = Promise<[Tenant[], number]>;

  export type FindByWrapperIntegrationIdInputAttrs = {
    id: string;
  };
  export type FindByWrapperIntegrationIdResult = Promise<Tenant | null>;
}
