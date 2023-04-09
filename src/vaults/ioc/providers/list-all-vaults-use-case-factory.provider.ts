import { FactoryProvider } from '@nestjs/common';
import { VaultsRepository } from '~/shared/infra/database/repositories/vaults.repository';
import { ListAllVaultsUseCase } from '~/vaults/application/use-case/list-all-vaults.use-case';
import { IVaultsRepository } from '~/vaults/infra/contracts/repository/vaults-repository.contract';
import { VaultsProvidersSymbols } from '~/vaults/ioc/vaults-providers.symbols';

export class ListAllVaultsUseCaseFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: VaultsProvidersSymbols.LIST_ALL_VAULTS_USE_CASE,
      useFactory: (vaultsRepository: IVaultsRepository) =>
        new ListAllVaultsUseCase(vaultsRepository),
      inject: [VaultsRepository],
    };
  }
}
