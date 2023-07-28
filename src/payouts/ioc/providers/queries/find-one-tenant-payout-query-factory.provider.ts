import { FactoryProvider } from '@nestjs/common';
import { IFindOneTenantBalanceDao } from '~/payouts/application/daos/find-one-tenant-balance.dao.contract';
import { IFindOneTenantPayoutDao } from '~/payouts/application/daos/find-one-tenant-payout.dao.contract';
import { FindOneTenantPayoutQuery } from '~/payouts/application/queries/find-one-tenant-payout.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';

export class FindOneTenantPayoutQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Queries.FIND_ONE_TENANT_PAYOUT,
      useFactory: (
        findOneTenantPayoutDao: IFindOneTenantPayoutDao,
        findOneTenantBalanceDao: IFindOneTenantBalanceDao,
      ) =>
        new FindOneTenantPayoutQuery(
          findOneTenantPayoutDao,
          findOneTenantBalanceDao,
        ),
      inject: [
        PayoutProvidersSymbols.Daos.FIND_ONE_TENANT_PAYOUT,
        PayoutProvidersSymbols.Daos.FIND_ONE_TENANT_BALANCE,
      ],
    };
  }
}
