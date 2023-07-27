import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { SynchronizeTenantBalanceCommand } from '~/payouts/application/commands/synchronize-tenant-balance.command';
import {
  ITenantRepository,
  ITenantStatusRepository,
} from '~/payouts/domain/repositories';

export class SynchronizeTenantBalanceCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Commands.SYNCHRONIZE_TENANT_BALANCE,
      useFactory: (
        tenantRepository: ITenantRepository,
        tenantStatusRepository: ITenantStatusRepository,
      ) =>
        new SynchronizeTenantBalanceCommand(
          tenantRepository,
          tenantStatusRepository,
        ),
      inject: [
        PayoutProvidersSymbols.Repositories.TENANT,
        PayoutProvidersSymbols.Repositories.TENANT_STATUS,
      ],
    };
  }
}
