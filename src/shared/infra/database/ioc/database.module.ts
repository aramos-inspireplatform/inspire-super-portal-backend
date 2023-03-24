import { Global, Module } from '@nestjs/common';
import { databaseProviders } from '~/shared/infra/database/ioc/providers/providers';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
