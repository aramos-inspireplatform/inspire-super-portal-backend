import { Module } from '@nestjs/common';
import { FindOneCurrencyDaoFactoryProvider } from '~/currencies/ioc/providers/daos/find-one-currency-dao-factory.provider';
import { FindAllPayoutAdjustmentTypesDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-adjustment-types-dao-factory.provider';
import { FindAllPayoutPaymentsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-payments-dao-factory.provider';
import { FindAllTenantBalancesDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-tenant-balances-dao-factory.provider';
import { FindAllTenantPayoutsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-tenant-payouts-dao-factory.provider';
import { FindOnePaymentsPayoutDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-payments-payout-dao-factory.provider';
import { FindOneTenantBalanceDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-tenant-balance-dao-factory.provider';
import { FindAllPayoutAdjustmentTypesQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-adjutment-types-query-factory.provider';
import { FindAllPayoutPaymentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-payments-query-factory.provider';
import { FindAllTenantBalancesQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-tenant-balances-query-factory.provider';
import { FindAllTenantPayoutsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-tenant-payouts-query-factory.provider';
import { FindOnePaymentsPayoutQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-one-payments-payout-query-factory.provider';
import { FindOneTenantBalanceQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-one-tenant-balance-query-factory.provider';
import { PayoutAdjustmentTypesController } from '~/payouts/presentation/payout-adjustment-types.controller';
import { PayoutPaymentsController } from '~/payouts/presentation/payout-payments.controller';
import { PayoutTenantBalancesController } from '~/payouts/presentation/payout-tenant-balances.controller';
import { PayoutController } from '~/payouts/presentation/payout.controller';

@Module({
  providers: [
    FindAllPayoutPaymentsQueryFactoryProvider.register(),
    FindAllPayoutPaymentsDaoFactoryProvider.register(),
    FindAllTenantPayoutsQueryFactoryProvider.register(),
    FindAllTenantPayoutsDaoFactoryProvider.register(),
    FindAllTenantBalancesQueryFactoryProvider.register(),
    FindAllTenantBalancesDaoFactoryProvider.register(),
    FindOneTenantBalanceQueryFactoryProvider.register(),
    FindOneTenantBalanceDaoFactoryProvider.register(),
    FindAllPayoutAdjustmentTypesQueryFactoryProvider.register(),
    FindAllPayoutAdjustmentTypesDaoFactoryProvider.register(),
    FindOneCurrencyDaoFactoryProvider.register(),
    FindOnePaymentsPayoutDaoFactoryProvider.register(),
    FindOnePaymentsPayoutQueryFactoryProvider.register(),
  ],
  controllers: [
    PayoutController,
    PayoutTenantBalancesController,
    PayoutPaymentsController,
    PayoutAdjustmentTypesController,
  ],
})
export class PayoutsModule {}
