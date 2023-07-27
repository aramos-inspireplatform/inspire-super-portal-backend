import { FactoryProvider } from '@nestjs/common';
import {
  PayoutRepositoryFactoryProvider,
  RecurringIntervalRepositoryFactoryProvider,
  TenantRepositoryFactoryProvider,
  TenantStatusRepositoryFactoryProvider,
} from '~/payouts/ioc/providers/repositories';

export const repositoriesProviders: FactoryProvider[] = [
  TenantRepositoryFactoryProvider.register(),
  PayoutRepositoryFactoryProvider.register(),
  TenantStatusRepositoryFactoryProvider.register(),
  RecurringIntervalRepositoryFactoryProvider.register(),
];

export const repositoriesExternalProviders: FactoryProvider[] = [];
