import { Module } from '@nestjs/common';
import { FindOneCurrencyDaoFactoryProvider } from '~/currencies/ioc/providers/daos/find-one-currency-dao-factory.provider';
import { FindAllPaymentsPeriodPagedDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payments-period-paged-dao-factory.provider';
import { FindAllPayoutAdjustmentTypesDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-adjustment-types-dao-factory.provider';
import { FindAllPayoutAdjustmentsDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-adjustments-dao-factory.provider';
import { FindAllPayoutPaymentsPagedDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payout-payments-paged-dao-factory.provider';
import { FindAllTenantBalancesPagedDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-tenant-balances-paged-dao-factory.provider';
import { FindAllTenantPayoutsPagedDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-tenant-payouts-paged-dao-factory.provider';
import { FindOneTenantPayoutDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-tenant-payout-dao-factory.provider';
import { FindOnePayoutSummaryPreviewDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-payout-summary-preview-dao-factory.provider';
import { FindOneTenantBalanceDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-one-tenant-balance-dao-factory.provider';
import { FindAllPaymentsPeriodPagedQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payments-period-paged-query-factory.provider';
import { FindAllPayoutAdjustmentTypesQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-adjustment-types-query-factory.provider';
import { FindAllTenantBalancesPagedQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-tenant-balances-paged-query-factory.provider';
import { FindAllTenantPayoutsPagedQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-tenant-payouts-paged-query-factory.provider';
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
import { FindAllPaymentsPeriodDaoFactoryProvider } from '~/payouts/ioc/providers/daos/find-all-payments-period-dao-factory.provider';
import { FindAllPaymentsPeriodQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payments-period-query-factory.provider';
import { FindAllPayoutPaymentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-payments-paged-query-factory.provider';
import { FindAllPayoutAdjustmentsQueryFactoryProvider } from '~/payouts/ioc/providers/queries/find-all-payout-adjutments-query-factory.provider';
import { CreatePayoutCommandFactoryProvider } from '~/payouts/ioc/providers/commands/create-payout-command-factory.provider';
import { repositoryProviders } from '~/payouts/ioc/providers/repositories/repository.provider';

@Module({
  providers: [
    ...repositoryProviders,
    FindAllPaymentsPeriodPagedQueryFactoryProvider.register(),
    FindAllPaymentsPeriodPagedDaoFactoryProvider.register(),
    FindAllPaymentsPeriodQueryFactoryProvider.register(),
    FindAllPaymentsPeriodDaoFactoryProvider.register(),
    FindAllPayoutPaymentsQueryFactoryProvider.register(),
    FindAllPayoutPaymentsPagedDaoFactoryProvider.register(),
    FindAllTenantPayoutsPagedQueryFactoryProvider.register(),
    FindAllTenantPayoutsPagedDaoFactoryProvider.register(),
    FindAllTenantBalancesPagedQueryFactoryProvider.register(),
    FindAllTenantBalancesPagedDaoFactoryProvider.register(),
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
    FindOneTenantPayoutDaoFactoryProvider.register(),
    FindOneTenantPayoutQueryFactoryProvider.register(),
    FindOneTenantDaoFactoryProvider.register(),
    FindAllPaymentsPeriodPagedQueryFactoryProvider.register(),
    FindOneCurrencyDaoFactoryProvider.register(),
    CreatePayoutCommandFactoryProvider.register(),
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
