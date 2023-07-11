import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllTenantPayoutsDao } from '~/payouts/infra/daos/find-all-tenant-payouts.dao';
import { TenantPayoutsRepository } from '~/shared/infra/database/repositories/tenant-payout.repository';
import { ITenantPayoutsRepository } from '~/payouts/infra/contracts/repository/tenant-payouts.contract';

export class FindAllTenantPayoutsDaoFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_DAO,
      useFactory: (tenantPayoutsRepository: ITenantPayoutsRepository) =>
        new FindAllTenantPayoutsDao(tenantPayoutsRepository),
      inject: [TenantPayoutsRepository],
    };
  }
}
