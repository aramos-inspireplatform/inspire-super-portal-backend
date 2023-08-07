import { FactoryProvider } from '@nestjs/common';
import {
  CreatePayoutCommandFactoryProvider,
  ReconciliateBexsCommandFactoryProvider,
  ReconciliateStripeCommandFactoryProvider,
  SynchronizeTenantBalanceCommandFactoryProvider,
} from '~/payouts/ioc/providers/commands';

export const commandsProviders: FactoryProvider[] = [
  ReconciliateStripeCommandFactoryProvider.register(),
  ReconciliateBexsCommandFactoryProvider.register(),
  CreatePayoutCommandFactoryProvider.register(),
  SynchronizeTenantBalanceCommandFactoryProvider.register(),
];

export const commandsExternalProviders: FactoryProvider[] = [];
