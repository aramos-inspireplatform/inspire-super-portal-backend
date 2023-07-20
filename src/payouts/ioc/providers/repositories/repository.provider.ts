import { FactoryProvider } from '@nestjs/common';
import { PayoutRepositoryFactoryProvider } from '~/payouts/ioc/providers/repositories/payout-repository-factory.provider';
import { TenantRepositoryFactoryProvider } from '~/payouts/ioc/providers/repositories/tenant-repository-factory.provider';

export const repositoryProviders: FactoryProvider[] = [
  TenantRepositoryFactoryProvider.register(),
  PayoutRepositoryFactoryProvider.register(),
];
