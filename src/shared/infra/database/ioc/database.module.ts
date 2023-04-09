import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers';
import { ProcessorsRepository } from '~/shared/infra/database/repositories/processors.repository';
import { VaultsRepository } from '~/shared/infra/database/repositories/vaults.repository';

@Global()
@Module({
  providers: [...databaseProviders, VaultsRepository, ProcessorsRepository],
  exports: [...databaseProviders, VaultsRepository, ProcessorsRepository],
})
export class DatabaseModule {}
