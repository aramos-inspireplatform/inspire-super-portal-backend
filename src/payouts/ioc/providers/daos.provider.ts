import { FactoryProvider } from '@nestjs/common';
import { FindOneCurrencyDaoFactoryProvider } from '~/currencies/ioc/providers/daos/find-one-currency-dao-factory.provider';
import {
  FindAllPaymentsPeriodDaoFactoryProvider,
  FindAllPaymentsPeriodPagedDaoFactoryProvider,
  FindAllPayoutAdjustmentTypesDaoFactoryProvider,
  FindAllPayoutAdjustmentsDaoFactoryProvider,
  FindAllPayoutPaymentsPagedDaoFactoryProvider,
  FindAllTenantBalancesPagedDaoFactoryProvider,
  FindAllTenantPayoutsPagedDaoFactoryProvider,
  FindOnePayoutSummaryDaoFactoryProvider,
  FindOnePayoutSummaryPreviewDaoFactoryProvider,
  FindOneTenantBalanceDaoFactoryProvider,
  FindOneTenantPayoutDaoFactoryProvider,
  FindAllReconcilePeriodDaoFactoryProvider,
} from '~/payouts/ioc/providers/daos';
import { FindOneTenantDaoFactoryProvider } from '~/tenants/ioc/providers/daos/find-tenant-dao-factory.provider';

export const daosProviders: FactoryProvider[] = [
  FindAllPaymentsPeriodPagedDaoFactoryProvider.register(),
  FindAllPaymentsPeriodDaoFactoryProvider.register(),
  FindAllPayoutPaymentsPagedDaoFactoryProvider.register(),
  FindAllTenantPayoutsPagedDaoFactoryProvider.register(),
  FindAllTenantBalancesPagedDaoFactoryProvider.register(),
  FindOneTenantBalanceDaoFactoryProvider.register(),
  FindAllPayoutAdjustmentsDaoFactoryProvider.register(),
  FindAllPayoutAdjustmentTypesDaoFactoryProvider.register(),
  FindOnePayoutSummaryDaoFactoryProvider.register(),
  FindOnePayoutSummaryPreviewDaoFactoryProvider.register(),
  FindOneTenantPayoutDaoFactoryProvider.register(),
  FindAllReconcilePeriodDaoFactoryProvider.register(),
];

export const daosExternalProviders: FactoryProvider[] = [
  FindOneTenantDaoFactoryProvider.register(),
  FindOneCurrencyDaoFactoryProvider.register(),
];
