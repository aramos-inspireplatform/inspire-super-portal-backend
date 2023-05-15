import { IVaultsRepository } from '~/vaults/infra/contracts/repository/vaults-repository.contract';

export class ListAllVaultsUseCase {
  constructor(private readonly vaultsRepository: IVaultsRepository) {}

  async handle() {
    const vaults = await this.vaultsRepository.findAll();
    return vaults;
  }
}
