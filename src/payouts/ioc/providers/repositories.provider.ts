import { FactoryProvider } from '@nestjs/common';
import {
  PayoutRepositoryFactoryProvider,
  TenantRepositoryFactoryProvider,
  TenantStatusRepositoryFactoryProvider,
} from '~/payouts/ioc/providers/repositories';

export const repositoriesProviders: FactoryProvider[] = [
  TenantRepositoryFactoryProvider.register(),
  PayoutRepositoryFactoryProvider.register(),
  TenantStatusRepositoryFactoryProvider.register(),
];

export const repositoriesExternalProviders: FactoryProvider[] = [];
