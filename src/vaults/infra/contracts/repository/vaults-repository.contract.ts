import { Vault } from '~/vaults/domain/entity/vault';

export interface IVaultsRepository {
  findAll(): IVaultsRepository.FindAllResult;
}

export namespace IVaultsRepository {
  // The findAll arguments and return types
  export type FindAllResult = Promise<[Vault[], number]>;
}
