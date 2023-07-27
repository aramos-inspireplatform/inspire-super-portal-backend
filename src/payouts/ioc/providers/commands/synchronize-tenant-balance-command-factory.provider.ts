import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { SynchronizeTenantBalanceCommand } from '~/payouts/application/commands/synchronize-tenant-balance.command';
import {
  IRecurringIntervalRepository,
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
        recurringIntervalRepository: IRecurringIntervalRepository,
      ) =>
        new SynchronizeTenantBalanceCommand(
          tenantRepository,
          tenantStatusRepository,
          recurringIntervalRepository,
        ),
      inject: [
        PayoutProvidersSymbols.Repositories.TENANT,
        PayoutProvidersSymbols.Repositories.TENANT_STATUS,
        PayoutProvidersSymbols.Repositories.RECURRING_INTERVAL,
      ],
    };
  }
}
