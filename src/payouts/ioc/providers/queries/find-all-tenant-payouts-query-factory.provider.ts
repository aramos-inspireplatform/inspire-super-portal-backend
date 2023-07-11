import { FactoryProvider } from '@nestjs/common';
import { IFindAllTenantPayoutsDao } from '~/payouts/application/daos/find-all-tenant-payout.dao.contract';
import { FindAllTenantPayoutQuery } from '~/payouts/application/queries/find-all-tenant-payouts.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';

export class FindAllTenantPayoutsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_QUERY,
      useFactory: (findAllTenantPayoutsDao: IFindAllTenantPayoutsDao) =>
        new FindAllTenantPayoutQuery(findAllTenantPayoutsDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_DAO],
    };
  }
}
