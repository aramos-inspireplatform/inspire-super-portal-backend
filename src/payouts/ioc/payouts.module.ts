import { Module } from '@nestjs/common';
import { FindOneCurrencyDaoFactoryProvider } from '~/currencies/ioc/providers/daos/find-one-currency-dao-factory.provider';
import { FindAllPaymentsPeriodPagedDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payments-period-paged-dao-factory.provider';
import { FindAllPayoutAdjustmentTypesDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-adjustment-types-dao-factory.provider';
import { FindAllPayoutAdjustmentsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-adjustments-dao-factory.provider';
import { FindAllPayoutPaymentsPagedDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-payments-paged-dao-factory.provider';
import { FindAllTenantBalancesDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-tenant-balances-dao-factory.provider';
import { FindAllTenantPayoutsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-tenant-payouts-dao-factory.provider';
import { FindOneTenantPayoutDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-tenant-payout-dao-factory.provider';
import { FindOnePayoutSummaryPreviewDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-payout-summary-preview-dao-factory.provider';
import { FindOneTenantBalanceDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-tenant-balance-dao-factory.provider';
import { FindAllPaymentsPeriodQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payments-period-paged-query-factory.provider';
import { FindAllPayoutAdjustmentTypesQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-adjutment-types-query-factory.provider';
import { FindPeriodPayoutAdjustmentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-period-payout-adjutments-query-factory.provider';
import { FindPeriodPayoutPaymentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-period-payout-payments-paged-query-factory.provider';
import { FindAllTenantBalancesQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-tenant-balances-query-factory.provider';
import { FindAllTenantPayoutsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-tenant-payouts-query-factory.provider';
import { FindOneTenantPayoutQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-one-tenant-payout-query-factory.provider';
import { FindOnePayoutSummaryPreviewQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-one-payout-summary-preview-query-factory.provider';
import { FindOneTenantBalanceQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-one-tenant-balance-query-factory.provider';
import { PayoutAdjustmentTypesController } from '~/payouts/presentation/payout-adjustment-types.controller';
import { PayoutAdjustmentsController } from '~/payouts/presentation/payout-adjustments.controller';
import { PayoutPaymentsController } from '~/payouts/presentation/payout-payments.controller';
import { PayoutTenantBalancesController } from '~/payouts/presentation/payout-tenant-balances.controller';
import { PayoutController } from '~/payouts/presentation/payout.controller';
import { FindOnePayoutSummaryQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-one-payout-summary-query-factory.provider';
import { FindOnePayoutSummaryDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-payout-summary-dao-factory.provider';
import { FindOneTenantDaoFactoryProvider } from '~/tenants/ioc/providers/daos/find-tenant-dao-factory.provider';
import { SearchAllPayoutPaymentsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/search-all-payout-payments-dao-factory.provider';
import { SearchAllPayoutPaymentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/search-all-payout-payments-query-factory.provider';

@Module({
  providers: [
    FindAllPaymentsPeriodQueryFactoryProvider.register(),
    FindAllPaymentsPeriodPagedDaoFactoryProvider.register(),
    FindAllPayoutPaymentsQueryFactoryProvider.register(),
    FindAllPayoutPaymentsPagedDaoFactoryProvider.register(),
    FindPeriodPayoutPaymentsQueryFactoryProvider.register(),
    FindPeriodPayoutPaymentsDaoFactoryProvider.register(),
    SearchAllPayoutPaymentsDaoFactoryProvider.register(),
    SearchAllPayoutPaymentsQueryFactoryProvider.register(),
    FindAllTenantPayoutsQueryFactoryProvider.register(),
    FindAllTenantPayoutsDaoFactoryProvider.register(),
    FindAllTenantBalancesQueryFactoryProvider.register(),
    FindAllTenantBalancesDaoFactoryProvider.register(),
    FindOneTenantBalanceQueryFactoryProvider.register(),
    FindOneTenantBalanceDaoFactoryProvider.register(),
    FindAllPayoutAdjustmentsQueryFactoryProvider.register(),
    FindAllPayoutAdjustmentsDaoFactoryProvider.register(),
    FindAllPayoutAdjustmentTypesQueryFactoryProvider.register(),
    FindAllPayoutAdjustmentTypesDaoFactoryProvider.register(),
    FindOnePayoutSummaryQueryFactoryProvider.register(),
    FindOnePayoutSummaryDaoFactoryProvider.register(),
    FindOnePayoutSummaryPreviewQueryFactoryProvider.register(),
    FindOnePayoutSummaryPreviewDaoFactoryProvider.register(),
    FindOneCurrencyDaoFactoryProvider.register(),
    FindOneTenantPayoutDaoFactoryProvider.register(),
    FindOneTenantPayoutQueryFactoryProvider.register(),
    FindOneTenantDaoFactoryProvider.register(),
  ],
  controllers: [
    PayoutController,
    PayoutTenantBalancesController,
    PayoutPaymentsController,
    PayoutAdjustmentsController,
    PayoutAdjustmentTypesController,
  ],
})
export class PayoutsModule {}
