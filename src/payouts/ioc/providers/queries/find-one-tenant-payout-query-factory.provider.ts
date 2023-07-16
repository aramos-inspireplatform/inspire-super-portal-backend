import { FactoryProvider } from '@nestjs/common';
import { IFindOneTenantPayoutDao } from '~/payouts/application/daos/find-one-tenant-payout.dao.contract';
import { FindOneTenantPayoutQuery } from '~/payouts/application/queries/find-one-tenant-payout.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';

export class FindOneTenantPayoutQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_QUERY,
      useFactory: (findOneTenantPayoutDao: IFindOneTenantPayoutDao) =>
        new FindOneTenantPayoutQuery(findOneTenantPayoutDao),
      inject: [PayoutProvidersSymbols.FIND_ONE_TENANT_PAYOUT_DAO],
    };
  }
}
