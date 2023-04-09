import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers';
import { VaultsRepository } from '~/shared/infra/database/repositories/vaults.repository';

@Global()
@Module({
  providers: [...databaseProviders, VaultsRepository],
  exports: [...databaseProviders, VaultsRepository],
})
export class DatabaseModule {}
