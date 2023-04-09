import { ModuleRequest } from '~/modules-requests/domain/entities/module-request.entity';

export interface IModuleRequestRepository {
  save(
    attrs: IModuleRequestRepository.SaveInputAttrs,
  ): IModuleRequestRepository.SaveResult;

  findByIdAndTenant(
    atts: IModuleRequestRepository.FindByIdAndTenantInputAttrs,
  ): IModuleRequestRepository.FindByIdAndTenantResult;
}

export namespace IModuleRequestRepository {
  export type SaveInputAttrs = { moduleRequest: ModuleRequest };
  export type SaveResult = Promise<ModuleRequest>;

  export type FindByIdAndTenantInputAttrs = { id: string; tenantId: string };
  export type FindByIdAndTenantResult = Promise<ModuleRequest | null>;
}
