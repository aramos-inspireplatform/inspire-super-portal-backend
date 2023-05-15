import { Module } from '~/requests/domain/entities/module.entity';

export interface IModuleRepository {
  findById(
    attrs: IModuleRepository.FindByIdInputAttrs,
  ): IModuleRepository.FindByIdResult;
  findByAttemptId(
    attrs: IModuleRepository.FindByAttemptIdInputAttrs,
  ): IModuleRepository.FindByAttemptIdResult;
}

export namespace IModuleRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<Module | null>;
  export type FindByAttemptIdInputAttrs = { requestModuleAttemptId: string };
  export type FindByAttemptIdResult = Promise<Module | null>;
}
