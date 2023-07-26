import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { SynchronizeTenantBalanceCommand } from '~/payouts/application/commands/synchronize-tenant-balance.command';
import { ITenantRepository } from '~/payouts/infra/repositories/contracts';
import { PayoutRepositoriesSymbols } from '~/payouts/ioc/payouts-repositories.symbols';

export class SynchronizeTenantBalanceCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.SYNCHRONIZE_TENANT_BALANCE_COMMAND,
      useFactory: (tenantRepository: ITenantRepository) =>
        new SynchronizeTenantBalanceCommand(tenantRepository),
      inject: [PayoutRepositoriesSymbols.TENANT_REPOSITORY],
    };
  }
}
