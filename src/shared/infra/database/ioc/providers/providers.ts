import { FactoryProvider } from '@nestjs/common';
import { DataSourceProviderFactory } from '~/shared/infra/database/ioc/providers/data-source-factory.provider';
import { UserLoginsProviderFactory } from '~/shared/infra/database/ioc/providers/user-logins-factory.provider';
import { UserRepositoryProviderFactory } from '~/shared/infra/database/ioc/providers/user-repository-factory.provider';

export const databaseProviders: FactoryProvider[] = [
  DataSourceProviderFactory.register(),
  UserRepositoryProviderFactory.register(),
  UserLoginsProviderFactory.register(),
];
