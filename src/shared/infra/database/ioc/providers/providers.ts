import { FactoryProvider } from '@nestjs/common';
import { DataSourceProviderFactory } from '~/shared/infra/database/ioc/providers/data-source-factory.provide';
import { UserRepositoryProviderFactory } from '~/shared/infra/database/ioc/providers/user-repository-factory.provider';

export const databaseProviders: FactoryProvider[] = [
  DataSourceProviderFactory.register(),
  UserRepositoryProviderFactory.register(),
];
