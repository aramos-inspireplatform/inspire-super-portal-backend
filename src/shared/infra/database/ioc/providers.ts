import { FactoryProvider } from '@nestjs/common';
import { DataSourceFactoryProvider } from '~/shared/infra/database/ioc/providers/data-source-factory.provider';
import { UserRepositoryFactoryProvider } from '~/shared/infra/database/ioc/providers/users/user-repository-factory.provider';

export const databaseProviders: FactoryProvider[] = [
  DataSourceFactoryProvider.register(),
  UserRepositoryFactoryProvider.register(),
];
