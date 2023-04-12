import { ModuleRequest } from '~/requests/domain/entities/module-request.entity';

export interface IModuleRequestRepository {
  save(
    attrs: IModuleRequestRepository.SaveInputAttrs,
  ): Promise<ModuleRequest | ModuleRequest[]>;

  findByIdAndTenant(
    atts: IModuleRequestRepository.FindByIdAndTenantInputAttrs,
  ): IModuleRequestRepository.FindByIdAndTenantResult;

  listAndCount(
    attrs: IModuleRequestRepository.ListInputAttrs,
  ): IModuleRequestRepository.ListResult;

  saveBatch(
    attrs: IModuleRequestRepository.SaveBatchInputAttrs,
  ): IModuleRequestRepository.SaveBatchResult;
}

export namespace IModuleRequestRepository {
  export type SaveInputAttrs = {
    moduleRequest: ModuleRequest;
  };
  export type SaveResult = Promise<ModuleRequest>;

  export type SaveBatchInputAttrs = {
    moduleRequests: ModuleRequest[];
  };
  export type SaveBatchResult = Promise<ModuleRequest[]>;

  export type ListInputAttrs = {
    skip: number;
    take: number;
  };

  export type ListResult = Promise<[ModuleRequest[], number]>;
  export type FindByIdAndTenantInputAttrs = { id: string; tenantId: string };
  export type FindByIdAndTenantResult = Promise<ModuleRequest | null>;
}
