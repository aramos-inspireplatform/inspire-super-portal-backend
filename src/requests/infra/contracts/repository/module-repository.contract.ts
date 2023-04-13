import { Module } from '~/requests/domain/entities/module.entity';

export interface IModuleRepository {
  findById(
    attrs: IModuleRepository.FindByIdInputAttrs,
  ): IModuleRepository.FindByIdResult;
}

export namespace IModuleRepository {
  export type FindByIdInputAttrs = { id: string };
  export type FindByIdResult = Promise<Module | null>;
}
