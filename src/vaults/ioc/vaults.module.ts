import { Module } from '@nestjs/common';
import { ListAllVaultsUseCaseFactoryProvider } from '~/vaults/ioc/providers/list-all-vaults-use-case-factory.provider';
import { VaultsController } from '~/vaults/presentation/vaults.controller';

@Module({
  providers: [ListAllVaultsUseCaseFactoryProvider.register()],
  controllers: [VaultsController],
})
export class VaultsModule {}
