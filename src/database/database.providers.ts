import { FactoryProvider } from '@nestjs/common';
import { DatabaseProviderFactory } from '~/database/factory/database-provider.factory';

export const databaseProviders: FactoryProvider[] = [
  DatabaseProviderFactory.register(),
];
