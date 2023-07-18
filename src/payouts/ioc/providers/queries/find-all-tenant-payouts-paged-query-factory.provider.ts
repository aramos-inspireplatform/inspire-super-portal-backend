import { FactoryProvider } from '@nestjs/common';
import { IFindAllTenantPayoutsPagedDao } from '~/payouts/application/daos/find-all-tenant-payouts-paged.dao.contract';
import { FindAllTenantPayoutPagedQuery } from '~/payouts/application/queries/find-all-tenant-payouts-paged.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';

export class FindAllTenantPayoutsPagedQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_PAGED_QUERY,
      useFactory: (
        findAllTenantPayoutsPagedDao: IFindAllTenantPayoutsPagedDao,
      ) => new FindAllTenantPayoutPagedQuery(findAllTenantPayoutsPagedDao),
      inject: [PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_PAGED_DAO],
    };
  }
}
