import { FactoryProvider } from '@nestjs/common';
import {
  FindAllPaymentsPeriodPagedQueryFactoryProvider,
  FindAllPaymentsPeriodQueryFactoryProvider,
  FindAllPayoutAdjustmentTypesQueryFactoryProvider,
  FindAllPayoutAdjustmentsQueryFactoryProvider,
  FindAllPayoutPaymentsQueryFactoryProvider,
  FindAllTenantBalancesPagedQueryFactoryProvider,
  FindAllTenantPayoutsPagedQueryFactoryProvider,
  FindOnePayoutSummaryPreviewQueryFactoryProvider,
  FindOnePayoutSummaryQueryFactoryProvider,
  FindOneTenantBalanceQueryFactoryProvider,
  FindOneTenantPayoutQueryFactoryProvider,
} from '~/payouts/ioc/providers/queries';

export const queriesProviders: FactoryProvider[] = [
  FindAllPaymentsPeriodPagedQueryFactoryProvider.register(),
  FindAllPaymentsPeriodQueryFactoryProvider.register(),
  FindAllPayoutPaymentsQueryFactoryProvider.register(),
  FindAllTenantPayoutsPagedQueryFactoryProvider.register(),
  FindAllTenantBalancesPagedQueryFactoryProvider.register(),
  FindOneTenantBalanceQueryFactoryProvider.register(),
  FindAllPayoutAdjustmentsQueryFactoryProvider.register(),
  FindAllPayoutAdjustmentTypesQueryFactoryProvider.register(),
  FindOnePayoutSummaryQueryFactoryProvider.register(),
  FindOnePayoutSummaryPreviewQueryFactoryProvider.register(),
  FindOneTenantPayoutQueryFactoryProvider.register(),
];

export const queriesExternalProviders: FactoryProvider[] = [];
