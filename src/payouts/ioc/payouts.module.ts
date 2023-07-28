import { Module } from '@nestjs/common';
import {
  commandsExternalProviders,
  commandsProviders,
  daosExternalProviders,
  daosProviders,
  queriesExternalProviders,
  queriesProviders,
  repositoriesExternalProviders,
  repositoriesProviders,
  servicesExternalProviders,
  servicesProviders,
} from '~/payouts/ioc/providers';
import { PayoutAdjustmentTypesController } from '~/payouts/presentation/payout-adjustment-types.controller';
import { PayoutAdjustmentsController } from '~/payouts/presentation/payout-adjustments.controller';
import { PayoutPaymentsController } from '~/payouts/presentation/payout-payments.controller';
import { PayoutTenantBalancesController } from '~/payouts/presentation/payout-tenant-balances.controller';
import { PayoutController } from '~/payouts/presentation/payout.controller';
import { ReconciliationsController } from '~/payouts/presentation/reconciliations.controller';

@Module({
  providers: [
    ...commandsProviders,
    ...commandsExternalProviders,
    ...daosProviders,
    ...daosExternalProviders,
    ...queriesProviders,
    ...queriesExternalProviders,
    ...repositoriesProviders,
    ...repositoriesExternalProviders,
    ...servicesProviders,
    ...servicesExternalProviders,
  ],
  controllers: [
    PayoutController,
    PayoutTenantBalancesController,
    PayoutPaymentsController,
    PayoutAdjustmentsController,
    PayoutAdjustmentTypesController,
    ReconciliationsController,
  ],
})
export class PayoutsModule {}
