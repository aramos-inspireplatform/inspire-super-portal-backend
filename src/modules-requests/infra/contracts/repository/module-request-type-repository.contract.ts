import { ModuleRequestType } from '~/modules-requests/domain/entities/module-request-types.entity';

export interface IModuleRequestTypeRepository {
  findById(
    attrs: IModuleRequestTypeRepository.FindByIdInputAttrs,
  ): IModuleRequestTypeRepository.FindByIdResult;
}

export namespace IModuleRequestTypeRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<ModuleRequestType | null>;
}
