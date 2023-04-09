import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Vaults } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { Vault } from '~/vaults/domain/entity/vault';
import { IVaultsRepository } from '~/vaults/infra/contracts/repository/vaults-repository.contract';

@Injectable()
export class VaultsRepository implements IVaultsRepository {
  repository: Repository<Vaults>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<Vaults>(Vaults);
  }

  async findAll(): IVaultsRepository.FindAllResult {
    // TODO: Verificar se vamos precisar fazer esse filtro { where: { isActive: true } }

    const [vaults, count] = await this.repository.findAndCount();
    return [vaults.map((v) => new Vault(v)), count];
  }
}
