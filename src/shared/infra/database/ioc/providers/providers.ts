import { FactoryProvider } from '@nestjs/common';
import { DataSourceFactoryProvider } from '~/shared/infra/database/ioc/providers/data-source-factory.provider';

export const databaseProviders: FactoryProvider[] = [
  DataSourceFactoryProvider.register(),
];
