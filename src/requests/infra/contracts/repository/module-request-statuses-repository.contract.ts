import { ModuleRequestStatus } from '~/requests/domain/entities/module-request-status.entity';

export interface IModuleRequestStatusesRepository {
  findById(
    attrs: IModuleRequestStatusesRepository.FindByIdInputAttrs,
  ): IModuleRequestStatusesRepository.FindByIdResult;
}

export namespace IModuleRequestStatusesRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<ModuleRequestStatus | null>;
}
